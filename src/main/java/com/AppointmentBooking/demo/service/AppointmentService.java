package com.AppointmentBooking.demo.service;

import com.AppointmentBooking.demo.dto.AppointmentRequest;
import com.AppointmentBooking.demo.email.service.EmailService;
import com.AppointmentBooking.demo.email.util.EmailTemplates;
import com.AppointmentBooking.demo.entity.Appointment;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.entity.enumClasses.AppointmentStatus;
import com.AppointmentBooking.demo.notification.service.PushNotificationService;
import com.AppointmentBooking.demo.notification.service.PushNotificationServiceImpl;
import com.AppointmentBooking.demo.repository.AppointmentRepository;
import com.AppointmentBooking.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PushNotificationServiceImpl pushNotificationService;

    private static final int MAX_DURATION_MINUTES = 480; // 8 hours

    private void validateDuration(int durationMinutes) {
        if (durationMinutes <= 0 || durationMinutes > MAX_DURATION_MINUTES) {
            throw new IllegalArgumentException(
                    "Invalid duration. Allowed range: 1–" + MAX_DURATION_MINUTES + " minutes"
            );
        }
    }
    /* ---------------- GET APPOINTMENTS ---------------- */

    public List<Appointment> getProviderAppointments(String email) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        return appointmentRepository.findByProvider(provider);
    }

    public List<Appointment> getUserAppointments(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByUser(user);
    }

    /* ---------------- BOOK APPOINTMENT ---------------- */

    @Transactional
    public Appointment bookAppointment(String userEmail, AppointmentRequest request) {


        int duration = request.getDurationMinutes();
        if (duration <= 0 || duration > 480) {
            throw new IllegalArgumentException("Invalid appointment duration");
        }

        LocalDateTime startTime = request.getStartTime();
        if (startTime == null || startTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Start time must be in the future");
        }

        LocalDateTime endTime = startTime.plusMinutes(duration);


        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));


        User provider = userRepository.findById(request.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (!provider.getRole().name().equals("ROLE_PROVIDER")) {
            throw new IllegalStateException("Selected user is not a provider");
        }


        boolean overlap = appointmentRepository.existsOverlappingAppointment(
                provider.getId(),
                startTime,
                endTime,
                List.of(AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED)
        );

        if (overlap) {
            throw new IllegalStateException("Provider is not available for the selected time slot");
        }

        Appointment appointment = Appointment.builder()
                .user(user)
                .provider(provider)
                .startTime(startTime)
                .endTime(endTime)
                .status(AppointmentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        Appointment saved = appointmentRepository.save(appointment);

        emailService.sendEmail(
                provider.getEmail(),
                "New Appointment Booked",
                EmailTemplates.bookedToProvider(saved)
        );
        emailService.sendEmail(
                user.getEmail(),
                "Appointment Booked",
                EmailTemplates.bookedToUser(saved)
        );
        pushNotificationService.sendPush(
                saved.getUser().getFcmToken(),
                "Appointment Booked",
                "Your appointment with " + saved.getProvider().getName()
                        + " is Booked at " + saved.getStartTime()
        );

        return saved;
    }

    /* ---------------- CONFIRM APPOINTMENT ---------------- */

    public Appointment confirmAppointment(UUID appointmentId, String providerEmail) {

        Appointment appt = getProviderAppointment(appointmentId, providerEmail);

        if (appt.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("Only PENDING appointments can be confirmed");
        }

        appt.setStatus(AppointmentStatus.CONFIRMED);
        Appointment saved = appointmentRepository.save(appt);

        emailService.sendEmail(
                saved.getUser().getEmail(),
                "Appointment Confirmed",
                EmailTemplates.confirmedToUser(saved)
        );
        pushNotificationService.sendPush(
                saved.getUser().getFcmToken(),
                "Appointment Confirmed",
                "Your appointment with " + saved.getProvider().getName()
                        + " is confirmed at " + saved.getStartTime()
        );

        return saved;
    }

    /* ---------------- REJECT APPOINTMENT ---------------- */

    public Appointment rejectAppointment(UUID appointmentId, String providerEmail) {

        Appointment appt = getProviderAppointment(appointmentId, providerEmail);

        if (appt.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("Only PENDING appointments can be rejected");
        }

        appt.setStatus(AppointmentStatus.REJECTED);
        Appointment saved = appointmentRepository.save(appt);

       
        emailService.sendEmail(
                saved.getUser().getEmail(),
                "Appointment Rejected",
                EmailTemplates.rejectedToUser(saved)
        );

        pushNotificationService.sendPush(
                saved.getUser().getFcmToken(),
                "Appointment Rejected",
                "Your appointment with " + saved.getProvider().getName()
                        + " is rejected at " + saved.getStartTime()
        );

        return saved;
    }

    /* ---------------- CANCEL APPOINTMENT ---------------- */

    public Appointment cancelAppointment(UUID appointmentId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appointment = appointmentRepository
                .findByIdAndUser(appointmentId, user)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() == AppointmentStatus.COMPLETED ||
                appointment.getStatus() == AppointmentStatus.REJECTED) {
            throw new RuntimeException("Appointment cannot be cancelled");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        Appointment saved = appointmentRepository.save(appointment);

      
        emailService.sendEmail(
                saved.getProvider().getEmail(),
                "Appointment Cancelled",
                EmailTemplates.cancelled(saved, true)
        );

        emailService.sendEmail(
                saved.getUser().getEmail(),
                "Appointment Cancelled",
                EmailTemplates.cancelled(saved, false)
        );
        pushNotificationService.sendPush(
                saved.getUser().getFcmToken(),
                "Appointment Cancelled ",
                "Your appointment with " + saved.getProvider().getName()
                        + " is cancelled at " + saved.getStartTime()
        );
        return saved;
    }

    /* ---------------- COMPLETE APPOINTMENT ---------------- */

    public Appointment completeAppointment(UUID appointmentId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appt = appointmentRepository
                .findByIdAndUser(appointmentId, user)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appt.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new RuntimeException("Only CONFIRMED appointments can be completed");
        }

        appt.setStatus(AppointmentStatus.COMPLETED);
        Appointment saved = appointmentRepository.save(appt);

        emailService.sendEmail(
                saved.getUser().getEmail(),
                "Appointment Completed",
                EmailTemplates.completedToUser(saved)
        );
        pushNotificationService.sendPush(
                saved.getUser().getFcmToken(),
                "Appointment Completed",
                "Your appointment with " + saved.getProvider().getName()
                        + " is completed at " + saved.getStartTime()
        );
        return saved;
    }

  
    private Appointment getProviderAppointment(UUID appointmentId, String providerEmail) {

        User provider = userRepository.findByEmail(providerEmail)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        return appointmentRepository
                .findByIdAndProvider(appointmentId, provider)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }


    public Appointment sendAppointmentReminder(String to, Appointment appointment){
        if(appointment.isReminderSent()){
            return appointment;
        }
        if(appointment.getStatus() != AppointmentStatus.CONFIRMED){
            throw new IllegalStateException("Remainder Is For Confirmed User");
        }
        emailService.sendEmail(
                to,
                "Appointment Remainder",
                EmailTemplates.sendReminder(appointment)
        );
        pushNotificationService.sendPush(
                appointment.getUser().getFcmToken(),
                "Appointment Reminder",
                "Your appointment starts at " + appointment.getStartTime()
        );


        appointment.setReminderSent(true);
        return appointmentRepository.save(appointment);
    }
}

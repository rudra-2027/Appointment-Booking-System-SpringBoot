package com.AppointmentBooking.demo.scheduler;

import com.AppointmentBooking.demo.email.service.EmailService;
import com.AppointmentBooking.demo.entity.Appointment;
import com.AppointmentBooking.demo.entity.enumClasses.AppointmentStatus;
import com.AppointmentBooking.demo.repository.AppointmentRepository;
import com.AppointmentBooking.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AppointmentReminderJob {
    private  final AppointmentRepository appointmentRepository;
    private  final AppointmentService appointmentService;
    private  final EmailService emailService;

    @Scheduled(cron = "0 */1 * * * *") // every minute
    public void sendAppointmentReminders() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println(" Reminder job running at " + now);
        //range is starting-5 and now-30
        List<Appointment> appointments =
                appointmentRepository.findAppointmentsForReminder(
                        AppointmentStatus.CONFIRMED,
                        now.minusMinutes(5),
                        now.plusMinutes(30)
                );
        System.out.println(appointments);

        for (Appointment appointment : appointments) {
            System.out.println("Sending reminder for appointment: " + appointment.getId());
            appointmentService.sendAppointmentReminder(
                    appointment.getUser().getEmail(),
                    appointment
            );
        }
    }

}

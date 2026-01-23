package com.AppointmentBooking.demo.repository;

import com.AppointmentBooking.demo.entity.Appointment;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.entity.enumClasses.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    boolean existsByProviderAndStartTimeAndStatus(User provider, LocalDateTime startTime, AppointmentStatus appointmentStatus);
    List<Appointment> findByProvider(User provider);

    List<Appointment> findByUser(User user);

    Optional<Appointment> findByIdAndProvider(UUID id, User provider);
    Optional<Appointment> findByIdAndUser(UUID id, User user);

    @Query("""
    SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END
    FROM Appointment a
    WHERE a.provider.id = :providerId
      AND a.status IN :statuses
      AND a.startTime < :endTime
      AND a.endTime > :startTime
""")
    boolean existsOverlappingAppointment(
            @Param("providerId") UUID providerId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime,
            @Param("statuses") List<AppointmentStatus> statuses
    );

    @Query("""
            SELECT a FROM Appointment a
            WHERE a.status= :appointmentStatus
            AND a.startTime Between :from AND :to
            AND a.reminderSent = false
            """)
     List<Appointment> findAppointmentsForReminder(AppointmentStatus appointmentStatus, LocalDateTime from, LocalDateTime to);

}

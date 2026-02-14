package com.AppointmentBooking.demo.notification.repository;

import com.AppointmentBooking.demo.entity.NotificationHistory;
import com.AppointmentBooking.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationHistoryRepository extends JpaRepository<NotificationHistory, UUID> {

    List<NotificationHistory> findByUserOrderByCreatedAtDesc(User user);
}

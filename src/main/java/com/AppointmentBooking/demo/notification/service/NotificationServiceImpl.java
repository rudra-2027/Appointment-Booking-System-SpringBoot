package com.AppointmentBooking.demo.notification.service;

import com.AppointmentBooking.demo.entity.NotificationHistory;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.notification.repository.NotificationHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationHistoryRepository historyRepository;
    private final PushNotificationServiceImpl pushService;
    @Override
    public void notifyUser(User user, String title, String message) {
        NotificationHistory history = NotificationHistory.builder()
                .user(user)
                .title(title)
                .message(message)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        historyRepository.save(history);
        pushService.sendPush(user.getFcmToken(), title, message);
    }
}

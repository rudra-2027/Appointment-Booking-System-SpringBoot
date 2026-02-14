package com.AppointmentBooking.demo.notification.service;


import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PushNotificationServiceImpl implements PushNotificationService{
    @Override
    public void sendPush(String token, String title, String body) {
        if (token == null || token.isBlank()) return;

        Message message= Message.builder()
                .setToken(token)
                .setNotification(
                        Notification.builder()
                                .setTitle(title)
                                .setBody(body
                                ).build()
                )
                .build();
        FirebaseMessaging.getInstance().sendAsync(message);
    }
}

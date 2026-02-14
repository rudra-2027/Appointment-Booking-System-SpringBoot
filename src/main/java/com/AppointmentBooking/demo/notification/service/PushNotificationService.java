package com.AppointmentBooking.demo.notification.service;

public interface PushNotificationService {
    void sendPush(String token, String title, String body);
}

package com.AppointmentBooking.demo.notification.service;

import com.AppointmentBooking.demo.entity.User;

public interface NotificationService {
    void notifyUser(User user,String title,String message);
}

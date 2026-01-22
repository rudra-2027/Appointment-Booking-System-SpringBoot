package com.AppointmentBooking.demo.entity.enumClasses;

public enum AppointmentStatus {
    BOOKED,
    PENDING,     // booked, waiting provider approval
    CONFIRMED,   // provider accepted
    CANCELLED,   // cancelled by user/provider/system
    COMPLETED,
    REJECTED
}

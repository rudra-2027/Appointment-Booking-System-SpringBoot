package com.AppointmentBooking.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationHistory {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String title;


    @Column(length = 10000)
    private String message;

    private boolean read;

    private LocalDateTime createdAt;
}

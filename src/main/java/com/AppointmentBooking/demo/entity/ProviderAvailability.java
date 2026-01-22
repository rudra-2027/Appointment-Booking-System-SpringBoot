package com.AppointmentBooking.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "provider_availability",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "provider_id", "day_of_week", "start_time", "end_time"
                })
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderAvailability {
    @Id
    @UuidGenerator
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime startTime;
    private LocalTime endTime;

    private boolean active = true;
}

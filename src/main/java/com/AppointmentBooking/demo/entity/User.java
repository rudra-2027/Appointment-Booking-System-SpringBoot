package com.AppointmentBooking.demo.entity;

import com.AppointmentBooking.demo.entity.enumClasses.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(unique = true,nullable = false)
    private String email;

    private String password;


    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled = true;
}

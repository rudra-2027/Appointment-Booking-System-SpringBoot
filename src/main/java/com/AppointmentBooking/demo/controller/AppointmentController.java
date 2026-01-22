package com.AppointmentBooking.demo.controller;

import com.AppointmentBooking.demo.dto.AppointmentRequest;
import com.AppointmentBooking.demo.entity.Appointment;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/book")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Appointment> book(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AppointmentRequest request
            ){
        Appointment appointment = appointmentService
                .bookAppointment(userDetails.getUsername(),request);
        return ResponseEntity.ok(appointment);

    }

}

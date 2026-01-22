package com.AppointmentBooking.demo.controller;

import com.AppointmentBooking.demo.entity.Appointment;
import com.AppointmentBooking.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user/appointments")
@RequiredArgsConstructor
public class UserAppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Appointment>> getAppointment(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(appointmentService.getUserAppointments(userDetails.getUsername()));
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> complete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(id, userDetails.getUsername())
        );
    }
}

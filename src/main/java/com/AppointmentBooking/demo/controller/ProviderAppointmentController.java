package com.AppointmentBooking.demo.controller;

import com.AppointmentBooking.demo.dto.AvailabilityRequest;
import com.AppointmentBooking.demo.entity.ProviderAvailability;
import com.AppointmentBooking.demo.service.AppointmentService;
import com.AppointmentBooking.demo.service.ProviderAvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/provider/appointments")
@RequiredArgsConstructor
public class ProviderAppointmentController {

    private final AppointmentService appointmentService;
    private final ProviderAvailabilityService service;

    @PostMapping
    public ResponseEntity<ProviderAvailability> create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AvailabilityRequest request){
        ProviderAvailability providerAvailability = service.availability(userDetails.getUsername(),request);
        return ResponseEntity.ok(providerAvailability);
    }

    @PutMapping("/{id}/confirm")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<?> confirm(@PathVariable UUID id , @AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(
                appointmentService.confirmAppointment(id, userDetails.getUsername())
        );
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<?> reject(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                appointmentService.rejectAppointment(id, userDetails.getUsername())
        );
    }
}

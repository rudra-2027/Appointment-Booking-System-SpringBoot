package com.AppointmentBooking.demo.notification.controller;

import com.AppointmentBooking.demo.entity.NotificationHistory;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.notification.repository.NotificationHistoryRepository;
import com.AppointmentBooking.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final UserRepository userRepository;
    private final NotificationHistoryRepository notificationHistoryRepository;

    @PostMapping("/register")
    private String registerToken(@AuthenticationPrincipal UserDetails userDetails,
                                 @RequestParam String token){
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();
        user.setFcmToken(token);
        userRepository.save(user);
        return "Token Registered";
    }

    @GetMapping
    public List<NotificationHistory> getMyNotification(@AuthenticationPrincipal UserDetails userDetails){
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();
        return notificationHistoryRepository.findByUserOrderByCreatedAtDesc(user);
    }
    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable UUID id) {
        NotificationHistory n = notificationHistoryRepository.findById(id).orElseThrow();
        n.setRead(true);
        notificationHistoryRepository.save(n);
    }
}

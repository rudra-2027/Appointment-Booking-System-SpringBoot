package com.AppointmentBooking.demo.service;

import com.AppointmentBooking.demo.dto.AvailabilityRequest;
import com.AppointmentBooking.demo.entity.ProviderAvailability;
import com.AppointmentBooking.demo.entity.User;
import com.AppointmentBooking.demo.entity.enumClasses.Role;
import com.AppointmentBooking.demo.repository.ProviderAvailabilityRepository;
import com.AppointmentBooking.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProviderAvailabilityService {
    private final ProviderAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    public ProviderAvailability availability(String email, AvailabilityRequest request){
        User provider = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User Not Found"));
        if(provider.getRole()!= Role.ROLE_PROVIDER){
            throw new RuntimeException("Only provider can set availability");
        }
        if(request.getStartTime().isAfter(request.getEndTime())){
            throw new RuntimeException("Start must time must less than end time");
        }
        ProviderAvailability availability = ProviderAvailability.builder()
                .provider(provider)
                .dayOfWeek(request.getDayOfWeek())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .active(true)
                .build();
        return availabilityRepository.save(availability);
    }
}

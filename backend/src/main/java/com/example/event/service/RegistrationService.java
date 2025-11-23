package com.example.event.service;

import com.example.event.model.Event;
import com.example.event.model.Registration;
import com.example.event.model.User;
import com.example.event.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    public Registration register(String userId, String eventId) {
        if (registrationRepository.findByUser_IdAndEvent_Id(userId, eventId).isPresent()) {
            throw new RuntimeException("User already registered for this event");
        }

        User user = userService.findById(userId);
        Event event = eventService.getEventById(eventId);

        if (event.getCapacity() != null) {
            long currentRegistrations = registrationRepository.countByEvent_Id(eventId);
            if (currentRegistrations >= event.getCapacity()) {
                throw new RuntimeException("Event is fully booked");
            }
        }

        Registration registration = new Registration();
        registration.setUser(user);
        registration.setEvent(event);
        registration.setRegistrationDate(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public void unregister(String userId, String eventId) {
        Registration registration = registrationRepository.findByUser_IdAndEvent_Id(userId, eventId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        registrationRepository.delete(registration);
    }

    public List<Registration> getUserRegistrations(String userId) {
        return registrationRepository.findByUser_Id(userId);
    }
}

package com.example.event.controller;

import com.example.event.model.Registration;
import com.example.event.model.User;
import com.example.event.service.RegistrationService;
import com.example.event.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> registerForEvent(@RequestBody Map<String, String> payload, Authentication authentication) {
        String eventId = payload.get("eventId");
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow();

        try {
            return ResponseEntity.ok(registrationService.register(user.getId(), eventId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> unregisterFromEvent(@PathVariable String eventId, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow();

        try {
            registrationService.unregister(user.getId(), eventId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-events")
    public List<Registration> getMyRegistrations(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow();
        return registrationService.getUserRegistrations(user.getId());
    }
}

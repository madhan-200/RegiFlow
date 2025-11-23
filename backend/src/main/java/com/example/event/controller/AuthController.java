package com.example.event.controller;

import com.example.event.model.User;
import com.example.event.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.registerUser(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(Authentication authentication) {
        // This endpoint is protected by Basic Auth.
        // If the user reaches here, they are authenticated.
        // We return the user details.
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(user);
    }
}

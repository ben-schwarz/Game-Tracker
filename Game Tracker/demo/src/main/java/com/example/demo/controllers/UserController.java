package com.example.demo.controllers;
import org.springframework.security.core.Authentication;


import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent() || !passwordEncoder.matches(password, optionalUser.get().getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        User user = optionalUser.get();
        String token = "mock_token_" + System.currentTimeMillis();  // Replace with JWT in production

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public Collection<User> users() {
        return userService.findAll();
    }

    @GetMapping("/me")
public ResponseEntity<?> getCurrentUser(Authentication authentication) {
    // 'authentication' will be non-null if the user is authenticated
    if (authentication == null) {
        return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).build();
    }
    // 'principal' is typically your UserDetails object. Cast it if your entity implements UserDetails
    Object principal = authentication.getPrincipal();
    return ResponseEntity.ok(principal);
}

}

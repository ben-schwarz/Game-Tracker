package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Collection;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
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

        User user = userRepository.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        // Generate a mock token (Replace with JWT in real applications)
        String token = "mock_token_" + System.currentTimeMillis();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    Collection<User> users() {
        return userService.findAll();
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    void deleteUserById(@PathVariable String id) {
        userService.deleteUserById(Long.valueOf(id));
        return;
    }

    // Add more endpoints as needed
}
package com.example.backend.controller;

import com.example.backend.dto.AuthDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // ======================
    // SIGNUP
    // ======================
    @PostMapping("/signup")
    public String signup(@RequestBody AuthDTO request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setSurName(request.getSurName());
        user.setEmail(request.getEmail());
        user.setContact(request.getContact());
        user.setDepartment(request.getDepartment());
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // ======================
    // LOGIN
    // ======================
    @PostMapping("/login")
    public AuthDTO login(@RequestBody AuthDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(request.getEmail());

        AuthDTO response = new AuthDTO();
        response.setToken(token);

        // include the user's role in the response so the frontend
        // can reliably redirect to the correct dashboard
        userRepository.findByEmail(request.getEmail())
            .ifPresent(user -> response.setRole(user.getRole().name()));

        return response;
    }
}
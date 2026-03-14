package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {

    private String firstName;
    private String surName;
    private String email;
    private String contact;
    private String department;
    private String role;
    private String password;

    private String token;
}
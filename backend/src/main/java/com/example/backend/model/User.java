package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String surName;

    @Column(unique = true, nullable = false)
    private String email;

    private String contact;

    @JsonIgnore
    private String password;

    private String department;

    @Enumerated(EnumType.STRING)
    private Role role;
}
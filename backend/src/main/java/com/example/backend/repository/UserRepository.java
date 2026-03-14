package com.example.backend.repository;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Used for login & checking duplicate email
    Optional<User> findByEmail(String email);

    // Find all users in a department with a specific role
    List<User> findByDepartmentAndRole(String department, Role role);

}
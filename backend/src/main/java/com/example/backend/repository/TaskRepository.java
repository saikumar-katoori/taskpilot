package com.example.backend.repository;

import com.example.backend.model.Task;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // To fetch tasks assigned to a specific employee
    List<Task> findByAssignedTo(User user);

}
package com.example.backend.controller;

import com.example.backend.dto.TaskDTO;
import com.example.backend.model.*;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // ======================
    // CREATE TASK (ADMIN)
    // ======================
    @PostMapping("/create-task")
    public String createTask(@RequestBody TaskDTO request,
            Authentication authentication) {

        User admin = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        User assignedUser = userRepository
                .findById(request.getAssignedTo())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(TaskStatus.ASSIGNED);
        task.setAssignedTo(assignedUser);
        task.setCreatedBy(admin);

        taskRepository.save(task);

        return "Task Created Successfully";
    }

    // ======================
    // UPDATE TASK
    // ======================
    @PutMapping("/update-task/{id}")
    public String updateTask(@PathVariable Long id,
            @RequestBody TaskDTO request,
            Authentication authentication) {

        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User currentUser = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Employees cannot modify tasks that are already completed
        if (currentUser.getRole() == Role.EMPLOYEE && task.getStatus() == TaskStatus.COMPLETED) {
            throw new RuntimeException("Completed tasks cannot be modified by employees");
        }

        if (request.getStatus() != null) {
            task.setStatus(TaskStatus.valueOf(request.getStatus().toUpperCase()));
        }

        if (task.getStatus() == TaskStatus.COMPLETED) {
            task.setProof(request.getProof());
        }

        taskRepository.save(task);

        return "Task Updated Successfully";
    }

    // ======================
    // EMPLOYEES IN ADMIN'S DEPARTMENT
    // ======================
    @GetMapping("/department-employees")
    public List<User> getDepartmentEmployees(Authentication authentication) {

        User admin = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return userRepository.findByDepartmentAndRole(admin.getDepartment(), Role.EMPLOYEE);
    }

    // ======================
    // DELETE TASK (ADMIN)
    // ======================
    @DeleteMapping("/delete-task/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskRepository.deleteById(id);
        return "Task Deleted Successfully";
    }

    // Admin View of All Tasks
    @GetMapping("/all-tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/my-tasks")
    public List<Task> getMyTasks(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByAssignedTo(user);
    }

}
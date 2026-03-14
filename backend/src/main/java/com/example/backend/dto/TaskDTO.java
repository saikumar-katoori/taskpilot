package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDTO {

    private String title;
    private String description;
    private String status;
    private Long assignedTo;
    private String proof;
}
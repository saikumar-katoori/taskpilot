package com.example.backend.config;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import io.github.cdimascio.dotenv.Dotenv;

public class DotEnvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Try to find .env in multiple locations
        String[] dotEnvLocations = {
            ".env",
            "backend/.env",
            "../.env",
            new File(".").getAbsolutePath() + "/.env"
        };
        
        Dotenv dotenv = null;
        for (String location : dotEnvLocations) {
            File dotEnvFile = new File(location);
            if (dotEnvFile.exists()) {
                System.out.println("[DotEnv] Loading from: " + dotEnvFile.getAbsolutePath());
                dotenv = Dotenv.configure()
                              .directory(dotEnvFile.getParent() != null ? dotEnvFile.getParent() : ".")
                              .filename(dotEnvFile.getName())
                              .load();
                break;
            }
        }
        
        if (dotenv == null) {
            // Fallback to default behavior
            System.out.println("[DotEnv] Using default configuration (looking in current directory)");
            dotenv = Dotenv.configure()
                          .ignoreIfMissing()
                          .load();
        }

        // Convert .env values to a property source
        Map<String, Object> properties = new HashMap<>();
        dotenv.entries().forEach(entry -> {
            properties.put(entry.getKey(), entry.getValue());
            System.out.println("[DotEnv] Loaded property: " + entry.getKey());
        });

        // Add as highest priority property source
        if (!properties.isEmpty()) {
            MapPropertySource mapPropertySource = new MapPropertySource("dotenv", properties);
            environment.getPropertySources().addFirst(mapPropertySource);
            System.out.println("[DotEnv] Added " + properties.size() + " properties to environment");
        }
    }
}

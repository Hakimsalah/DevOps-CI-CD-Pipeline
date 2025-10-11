package com.pcd.backend;


import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
    CommandLineRunner init() {
        return args -> {
            // Crée le dossier uploads/ s'il n'existe pas
            Files.createDirectories(Paths.get("uploads/"));
            System.out.println("Dossier uploads/ créé ou déjà existant");
        };
    }
}
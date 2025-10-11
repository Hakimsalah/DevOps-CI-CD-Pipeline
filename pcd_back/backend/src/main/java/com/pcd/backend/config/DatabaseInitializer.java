package com.pcd.backend.config;

import com.pcd.backend.user.User;
import com.pcd.backend.user.UserRepository;
import com.pcd.backend.user.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseInitializer {

	@Bean
	CommandLineRunner initializeDatabase(UserRepository userRepo, PasswordEncoder encoder) {
	    return args -> {
            String adminEmail = "admin@example.com";
            String adminPassword = "SecureAdminPassword123!";

            if (userRepo.findByRole(UserRole.ADMIN).isEmpty()) {
                User admin = new User();
                admin.setUsername("superadmin");
                admin.setEmail(adminEmail);
                admin.setPassword(encoder.encode(adminPassword)); // use the injected encoder
                admin.setRole(UserRole.ADMIN); // or UserRole.SUPERUSER if that's your top-level role
                userRepo.save(admin);
                System.out.println("✔️ Superuser created");
            } else {
                System.out.println("✅ Superuser already exists");
            }
        };
    }
}

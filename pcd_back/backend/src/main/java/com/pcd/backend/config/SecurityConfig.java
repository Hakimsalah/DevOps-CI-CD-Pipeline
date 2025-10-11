package com.pcd.backend.config;


import com.pcd.backend.user.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;  // Add this import


import java.util.Arrays;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Value("${frontend.url}")
    private String frontendUrl;
    
    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // 🔥 Active le CORS au niveau de Spring Security
                .and()
                .csrf(csrf -> csrf.disable()) // CSRF désactivé pour API REST
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login",
                                "/api/users/add",
                                "api/users/forgot-password",
                                "api/users/reset-password",
                                "/api/membre_proj/all",
                                "/api/membre_proj/**",
                                "/uploads/**",
                                "/api/actualites/images/**",
                                "/diseases/update/image/**",
                                "/api/actualites/**",
                                "/api/faqs/**",
                                "api/documents/**",
                                "/api/contact",
                                "/api/contact/",
                                "/TransAct",
                                "patientDemographics",
                                "ParagraphActPha",
                                "StaffPatientStats",
                                "MaladiePriseEnCharge",
                                "/diseases",
                                "/utilizations/Lists",
                                "/utilizations",
                                "/germs"






                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔥 Configuration CORS utilisée par .cors() ci-dessus
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(frontendUrl));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true); // Nécessaire si tu envoies le token dans le header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}


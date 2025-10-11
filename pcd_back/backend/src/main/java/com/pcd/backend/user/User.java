    package com.pcd.backend.user;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDateTime;

    @Entity
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "app_user")
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(nullable = false)
        private String username;

        @Column(nullable = false)
        private String password;

        private String email;

        private UserRole role;

        @Column(name = "reset_token")
        private String resetToken;
        private LocalDateTime resetTokenExpiry;
    }

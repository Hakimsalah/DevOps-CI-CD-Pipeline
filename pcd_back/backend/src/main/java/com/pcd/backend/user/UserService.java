package com.pcd.backend.user;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;  // Add this import



@Service
@AllArgsConstructor
public class UserService {

    private final PasswordGenerator passwordGenerator;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;
    @Value("${frontend.url}")
    private String frontendUrl;




    public void addUser(UserDTO userDTO){



        //verifier si le l email est deja dans la base de donnée
        if (userRepository.existsByEmail(userDTO.getEmail())){
            throw new RuntimeException("Cet email est déjà utilisé !");
        }


        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        String password = passwordGenerator.generatePassword(8);

        String pass = bCryptPasswordEncoder.encode(password);
        user.setPassword(pass);
        userRepository.save(user);

        //envoyer l'email avec le lien pour definir le mot de passe
        String subject = "Definir votre mot de passe ";
        String body = "Bonjour " + user.getUsername() +",\n\n"+
                  "votre mot de passe est "+password  ;

        emailService.sendEmail(user.getEmail(),subject,body);

    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void deleteUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new UsernameNotFoundException("User with email " + email + " not found.");
        }
    }


    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        String subject ="Réinitialisation du mot de passe";
        String resetLink = frontendUrl + "/ResetPassword?token=" + token;
        String body = "Click here to reset your password: " + resetLink;
        emailService.sendEmail(email,subject,body);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }


    //for sign in
    public AuthResponse authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));
        if (! bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(),user.getRole().name());
        String userRole = user.getRole().name();
        String userName = user.getUsername();

        return new AuthResponse(token,userRole,userName);


    }
}


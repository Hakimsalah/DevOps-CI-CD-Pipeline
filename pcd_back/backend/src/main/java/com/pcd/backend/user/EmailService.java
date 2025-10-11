    package com.pcd.backend.user;


    import jakarta.mail.internet.MimeMessage;
    import lombok.AllArgsConstructor;
    import lombok.RequiredArgsConstructor;
    import org.springframework.mail.javamail.MimeMessageHelper;
    import org.springframework.stereotype.Service;
    import org.springframework.mail.javamail.JavaMailSender;



    @Service
    @AllArgsConstructor

    public class EmailService {

        private final JavaMailSender mailSender;


        public void sendEmail(String to, String subject, String body) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText(body);

                mailSender.send(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
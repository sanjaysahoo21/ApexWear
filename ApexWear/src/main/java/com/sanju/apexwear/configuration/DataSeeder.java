package com.sanju.apexwear.configuration;

import com.sanju.apexwear.user.model.User;
import com.sanju.apexwear.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if admin exists
            if (userRepository.findByEmail("admin@apexwear.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@apexwear.com");
                admin.setFullname("Super Admin");
                admin.setPassword(passwordEncoder.encode("admin123")); // Default password
                admin.setRole(User.Role.ADMIN);
                admin.setActive(true);
                
                userRepository.save(admin);
                System.out.println("ADMIN user created: admin@apexwear.com / admin123");
            }
        };
    }
}

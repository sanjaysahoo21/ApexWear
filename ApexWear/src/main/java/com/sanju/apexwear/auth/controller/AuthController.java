package com.sanju.apexwear.auth.controller;

import com.sanju.apexwear.auth.dto.LoginRequest;
import com.sanju.apexwear.auth.dto.RegesterRequest;
import com.sanju.apexwear.user.model.User;
import com.sanju.apexwear.user.repository.UserRepository;
import com.sanju.apexwear.auth.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/health")
    public String apiHealth() {
        return "API is up and running";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegesterRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\":\"Email is required\"}");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\":\"Password is required\"}");
        }
        
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("{\"error\":\"Email already exists\"}");
        }

        User user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()));
        user.setFullname(request.getFullname() != null ? request.getFullname() : request.getEmail());
        user.setRole(User.Role.USER);
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok("{\"token\":\"" + token + "\",\"email\":\"" + user.getEmail() + "\",\"role\":\"" + user.getRole().name() + "\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            String token = jwtUtil.generateToken(authentication);
            
            // Get user role from authentication
            String role = authentication.getAuthorities().stream()
                    .findFirst()
                    .map(auth -> auth.getAuthority().replace("ROLE_", ""))
                    .orElse("USER");
            
            return ResponseEntity.ok("{\"token\":\"" + token + "\",\"email\":\"" + request.getEmail() + "\",\"role\":\"" + role + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("{\"error\":\"Invalid credentials\"}");
        }
    }
}

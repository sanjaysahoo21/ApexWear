package com.sanju.apexwear.auth.security;

import com.sanju.apexwear.user.model.AuthProvider;
import com.sanju.apexwear.user.model.User;
import com.sanju.apexwear.user.repository.UserRepository;
import com.sanju.apexwear.auth.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final String frontendUrl;

    public OAuth2SuccessHandler(UserRepository userRepository, JwtUtil jwtUtil,
                                @Value("${app.frontend.url:http://localhost:5174}") String frontendUrl) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Validate required fields
        if (email == null || email.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Email not provided by Google\"}");
            return;
        }

        // Find or create user
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFullname(name != null ? name : email);
                    newUser.setPassword(""); // OAuth users don't need password
                    newUser.setRole(User.Role.USER);
                    newUser.setAuthProvider(AuthProvider.GOOGLE);
                    newUser.setActive(true);
                    return userRepository.save(newUser);
                });

        // Check if user is blocked
        if (!user.isActive()) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"User account is blocked\"}");
            return;
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(email, user.getRole().name());

        // Redirect to frontend OAuth2 success handler with token and user info
        String redirectUrl = String.format(
                "%s/oauth2/success?token=%s&email=%s&role=%s",
                frontendUrl,
                URLEncoder.encode(token, StandardCharsets.UTF_8),
                URLEncoder.encode(email, StandardCharsets.UTF_8),
                URLEncoder.encode(user.getRole().name(), StandardCharsets.UTF_8)
        );

        response.sendRedirect(redirectUrl);
    }
}

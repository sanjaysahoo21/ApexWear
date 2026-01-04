package com.sanju.apexwear.auth.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

@Component
public class JwtUtil {

    private final Key secretKey;
    private final long EXPIRATION_TIME = 864_000_000;

    public JwtUtil(@Value("${jwt.secret:change-me-secret-key}") String secret) {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if(keyBytes.length < 32) {
            throw new IllegalArgumentException("Secret key must be at least 32 characters long");
        }
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(auth -> auth.getAuthority().replace("ROLE_", ""))
                .orElse("USER");
        return generateToken(username, role);
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
    
    public String getRoleFromToken(String token) {
        return getClaimsFromToken(token)
                .get("role").toString();
    }
    
    public boolean isValidateToken(String token, String username) {
        try {
            return (getUsernameFromToken(token).equals(username) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isTokenExpired(String token) {
        return getClaimsFromToken(token)
                .getExpiration()
                .before(new Date());
    }
}

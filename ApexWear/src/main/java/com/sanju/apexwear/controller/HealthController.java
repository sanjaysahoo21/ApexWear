package com.sanju.apexwear.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/home")
    public String home() {
        return "Welcome to the Home Page! You are successfully logged in.";
    }
}

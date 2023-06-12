package com.app.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.app.user.User;
import java.io.IOException;
import java.util.Optional;
import com.app.auth.RegisterRequest;

// @RestController
// @CrossOrigin("http://localhost:3000")
// @RequestMapping("/api/v1/auth")
// @RequiredArgsConstructor
public class SalesController {

    // @Autowired
    // private final com.app.api.SalesService service;

    // @PostMapping("/register")
    // public ResponseEntity<com.app.auth.AuthenticationResponse> register(
    // @RequestBody RegisterRequest request) {
    // return ResponseEntity.ok(service.);
}

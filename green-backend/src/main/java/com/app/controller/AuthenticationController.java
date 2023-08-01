package com.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.request.AuthenticationRequest;
import com.app.request.RegisterRequest;
import com.app.response.AuthenticationResponse;
import com.app.service.AuthenticationService;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  @Autowired
  private final AuthenticationService service;

  // @GetMapping("/userinfo")
  // public ResponseEntity<User> userinfo(
  // @RequestBody InfoRequest request
  // ) {
  // User userByemail = service.userinfo(request);
  // return ResponseEntity.ok(userByemail);
  // }

  // @PostMapping("/userinfo")
  // public ResponseEntity<Optional<User>> userinfo(
  // @RequestBody InfoRequest request) {
  // Optional<User> user = service.userinfo(request);
  // if (user.isPresent()) {
  // return ResponseEntity.ok(service.userinfo(request));
  // } else {
  // return ResponseEntity.notFound().build();
  // }
  // }

  @PostMapping("/register")
  public ResponseEntity<com.app.response.AuthenticationResponse> register(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    AuthenticationResponse response = service.authenticate(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    service.refreshToken(request, response);
  }

}

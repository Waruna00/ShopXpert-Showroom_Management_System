package com.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.model.user.User;
import com.app.request.AuthenticationRequest;
import com.app.request.RegisterRequest;
import com.app.response.AuthenticationResponse;
import com.app.service.AuthenticationService;

import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  @Autowired
  private final com.app.service.AuthenticationService service;

  // @GetMapping("/userinfo")
  // public ResponseEntity<User> userinfo(
  // @RequestBody InfoRequest request
  // ) {
  // User userByemail = service.userinfo(request);
  // return ResponseEntity.ok(userByemail);
  // }

  @GetMapping("/userinfo/{email}")
  public ResponseEntity<User> userinfo(@PathVariable("email") String email) {
    Optional<User> optionalUser = service.findByEmail(email);

    if (optionalUser.isPresent()) {
      return new ResponseEntity<User>(optionalUser.get(), HttpStatus.OK);
    }
    return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
    // return ResponseEntity.ok(optionalUser);
  }

  @PostMapping("/register")
  public ResponseEntity<com.app.response.AuthenticationResponse> register(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    service.refreshToken(request, response);
  }

}

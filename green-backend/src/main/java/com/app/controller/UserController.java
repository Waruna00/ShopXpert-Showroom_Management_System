package com.app.controller;

import com.app.model.user.Role;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/userrole")
    public ResponseEntity<Role> getUserRoleByEmail(@RequestParam String email) {
        Role role = userService.getUserRoleByEmail(email);
        if (role != null) {
            return ResponseEntity.ok(role);
        }
        return ResponseEntity.notFound().build();
    }
}

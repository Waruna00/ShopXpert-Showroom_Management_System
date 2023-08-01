package com.app.service;

import com.app.model.user.Role;

import org.springframework.stereotype.Service;

import com.app.model.user.User;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
@Service
@RequiredArgsConstructor
public class UserService {

    private final com.app.repository.UserRepo userRepository;

    public Role getUserRoleByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return user.getRole();
        }
        return null;
    }
}

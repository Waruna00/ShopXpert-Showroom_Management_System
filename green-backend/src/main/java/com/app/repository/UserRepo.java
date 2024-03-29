package com.app.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.user.User;

public interface UserRepo extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}

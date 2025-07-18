package com.example.demo.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByEmail(String email);
}

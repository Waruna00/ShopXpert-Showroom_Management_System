package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    boolean existsByCuscode(int cuscode);
}

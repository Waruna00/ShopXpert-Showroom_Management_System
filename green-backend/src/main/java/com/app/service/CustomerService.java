package com.app.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.app.model.Customer;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
@Service
@RequiredArgsConstructor
public class CustomerService {

    private final com.app.repository.CustomerRepo repository;

    public List<Customer> getAllCustomer() {
        return repository.findAll();
    }

    public Optional<Customer> getCustomerById(int id) {
        return repository.findById(id);
    }

    public Customer addCustomer(Customer customer) {
        return repository.save(customer);
    }
    
}

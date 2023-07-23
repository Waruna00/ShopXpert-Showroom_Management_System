package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Customer;
import com.app.request.CustomerByIdRequest;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    @Autowired
    private final com.app.service.CustomerService service;

    @GetMapping("/getall")
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(service.getAllCustomer());
    }

    @PostMapping("/findbyid")
    public Optional<Customer> getCustomer(
            @RequestBody CustomerByIdRequest request) {
        return (service.getCustomerById(request.getId()));
    }

    @PostMapping("/addcustomer")
    public ResponseEntity<Customer> add(
            @RequestBody Customer request) {
        return ResponseEntity.ok(service.addCustomer(request));
    }

}

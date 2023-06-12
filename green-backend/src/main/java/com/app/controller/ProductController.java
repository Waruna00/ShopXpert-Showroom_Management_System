package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import com.app.request.AddRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final com.app.service.ProductService service;

    @PostMapping("/add")
    public ResponseEntity<com.app.response.AddResponse> add(
            @RequestBody AddRequest request) {
        return ResponseEntity.ok(service.addProduct(request));
    }
}

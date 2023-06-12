package com.app.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import com.app.api.request.AddRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final com.app.api.service.ProductService service;

    @PostMapping("/add")
    public ResponseEntity<com.app.api.response.AddResponse> add(
            @RequestBody AddRequest request) {
        System.out.println("asf" + request);
        return ResponseEntity.ok(service.addProduct(request));
    }
}

package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import com.app.model.Product;
import com.app.request.AddProduct;
import com.app.request.GetProduct;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final com.app.service.ProductService service;

    @PostMapping("/add")
    public ResponseEntity<AddProduct> add(
            @RequestBody AddProduct request) {
        return ResponseEntity.ok(service.addProduct(request));
    }

    @GetMapping("/get")
    public ResponseEntity<Optional<Product>> get(
            @RequestBody GetProduct request) {
        return ResponseEntity.ok(service.getProduct(request));
    }

    @GetMapping("allproducts")
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

package com.app.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.app.model.Product;
import com.app.request.AddRequest;
import com.app.response.AddResponse;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final com.app.repo.ProductRepo repository;

    public AddResponse addProduct(AddRequest request) {
        var product = Product.builder()
                .Product_code(request.getProductcode())
                .Name(request.getName())
                .Description(request.getDescription())
                .Price(request.getPrice())
                .build();

        repository.save(product);
        return AddResponse.builder()
                .Product_code(product.getProduct_code())
                .Name(product.getName())
                .Description(product.getDescription())
                .Price(product.getPrice())
                .build();
    }
}

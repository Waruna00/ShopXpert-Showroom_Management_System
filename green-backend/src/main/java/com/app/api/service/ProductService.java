package com.app.api.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.app.api.request.AddRequest;
import com.app.api.response.AddResponse;
import com.app.model.Product;

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

        System.out.println(product);
        System.out.println(request);

        repository.save(product);
        return AddResponse.builder()
                .Product_code(product.getProduct_code())
                .Name(product.getName())
                .Description(product.getDescription())
                .Price(product.getPrice())
                .build();
    }
}

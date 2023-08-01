package com.app.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.app.model.Product;
import com.app.request.AddProduct;
import com.app.request.GetProduct;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final com.app.repository.ProductRepo repository;

    public AddProduct addProduct(AddProduct request) {
        var product = Product.builder()
                .productCode(request.getProductcode())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();

        repository.save(product);
        return AddProduct.builder()
                .productcode(product.getProductCode())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }

    public List<Product> findAll() {
        return repository.findAllProducts();
    }

    public Optional<Product> getProduct(GetProduct request) {
        Optional<Product> product = repository.findById(request.getProductcode());
        return product;
    }

    public boolean existsByProductCode(String code) {
        return repository.existsByProductCode(code);
    }

}

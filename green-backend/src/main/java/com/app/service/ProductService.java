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

    private final com.app.repo.ProductRepo repository;

    public AddProduct addProduct(AddProduct request) {
        var product = Product.builder()
                .Product_code(request.getProductcode())
                .Name(request.getName())
                .Description(request.getDescription())
                .Price(request.getPrice())
                .build();

        repository.save(product);
        return AddProduct.builder()
                .productcode(product.getProduct_code())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }

    public Optional<Product> getProduct(GetProduct request) {
        Optional<Product> product = repository.findById(request.getProductcode());

        return product;

    }

    public List<Product> findAll(){
        List<Product> product = repository.findAll();

        return product;
    }
}

package com.app.repo;

import com.app.model.Product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, String> {

    //Optional<Product> findByProduct_Code(String product_code);      

}

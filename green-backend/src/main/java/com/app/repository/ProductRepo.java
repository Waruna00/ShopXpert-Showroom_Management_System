package com.app.repository;

import com.app.model.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepo extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts();

    @Query("SELECT DISTINCT p FROM Product p JOIN FETCH p.items")
    List<Product> findAllProductsAndItems();

}

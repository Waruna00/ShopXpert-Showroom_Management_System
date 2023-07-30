package com.app.repository;

import com.app.model.Product;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts();

    @Query("SELECT DISTINCT p FROM Product p JOIN FETCH p.items")
    List<Product> findAllProductsAndItems();

    List<Product> findByProductCodeIn(List<String> productCodes);

    Product findByProductCode(String productCode);

}

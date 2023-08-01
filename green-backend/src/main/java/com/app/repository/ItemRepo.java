package com.app.repository;

import com.app.model.Item;
import com.app.model.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepo extends JpaRepository<Item, String> {

    List<Item> findByStatus(String status);

    List<Item> findByProductAndStatus(Product product, String status);

    @Query("SELECT i.product.productCode,i.product.name, i.product.description, COUNT(i) FROM Item i WHERE i.status = 'AVL' GROUP BY i.product.productCode")
    List<Object[]> findAVLItemsByProduct();

}

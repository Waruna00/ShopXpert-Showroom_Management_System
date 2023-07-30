package com.app.repository;

import com.app.model.Item;
import com.app.model.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, String> {

    List<Item> findByStatus(String status);

    List<Item> findByProductAndStatus(Product product, String status);

}
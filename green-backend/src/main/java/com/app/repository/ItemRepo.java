package com.app.repository;

import com.app.model.Item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, String> {

    List<Item> findByStatus(String status);

}
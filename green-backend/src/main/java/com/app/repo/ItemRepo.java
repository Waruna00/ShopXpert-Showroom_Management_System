package com.app.repo;

import com.app.model.Item;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, String> {

     Optional<Item> findBySerial_no(String serial_no);

}
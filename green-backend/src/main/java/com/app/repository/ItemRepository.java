package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Item;

public interface ItemRepository extends JpaRepository<Item, String> {

}

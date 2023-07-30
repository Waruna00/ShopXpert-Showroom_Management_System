package com.app.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.BillProduct;

@Repository
public interface BillProductRepository extends JpaRepository<BillProduct, Integer>{

}

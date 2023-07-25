package com.app.repository;

import com.app.model.OrderProduct;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderProductRepo extends JpaRepository<OrderProduct, String> {  
    @Query("SELECT op FROM OrderProduct op WHERE op.order.id = :orderId")
List<OrderProduct> findByOrderId(@Param("orderId") String orderId);
}

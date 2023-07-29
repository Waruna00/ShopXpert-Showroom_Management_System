package com.app.repository;

import com.app.model.Order;
import com.app.model.OrderProduct;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, String> {

    List<OrderProduct> findByOrderId(String orderId);

    List<Order> findByOrderStatus(String status);
}

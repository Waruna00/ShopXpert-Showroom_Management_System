package com.app.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.app.model.Order;
import com.app.model.OrderProduct;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderProductController {

    @Autowired
    private final com.app.service.OrderProductService service;

    private final com.app.repository.OrderRepo orderRepository;

    // @GetMapping("/orderProducts/{orderId}")
    // public List<OrderProduct> findByOrderId(@PathVariable int orderId) {
    // return service.findByOrderId(orderId);
    // }

    @GetMapping("/orderProducts")
    public List<OrderProduct> findByOrderStatus() {
    List<Order> orders = orderRepository.findByOrderStatus("APPROVED");
    List<OrderProduct> orderProducts = new ArrayList<>();
    for (Order order : orders) {
    orderProducts.addAll(service.findByOrderId(order.getOrderId()));
    }
    return orderProducts;
    }

}

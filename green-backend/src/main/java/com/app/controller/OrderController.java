package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.app.model.Order;
import com.app.model.OrderProduct;
import com.app.request.AddOrderProduct;
import com.app.request.GetOrder;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private final com.app.service.OrderService service;
    // private final com.app.service.ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Order> add(
            @RequestBody Order request) {
        return ResponseEntity.ok(service.addOrder(request));
    }

    @PostMapping("/addOrderProduct")
    public ResponseEntity<AddOrderProduct> addOrderProducts(@RequestBody AddOrderProduct request) {
        return ResponseEntity.ok(service.addOrderProduct(request));
    }

    @PostMapping("/findOrderById")
    public ResponseEntity<Order> findOrderById(@RequestBody GetOrder request) {
        return ResponseEntity.ok(service.findOrderById(request.getOrderid()));
    }

    @PostMapping("/findOrderProductsById")
    public List<OrderProduct> findOrderProductsById(@RequestBody GetOrder request) {
        return service.findOrderProductsByOrderId(request);
    }

}

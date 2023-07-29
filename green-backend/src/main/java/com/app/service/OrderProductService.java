package com.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.model.OrderProduct;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderProductService {

    private final com.app.repository.OrderProductRepo repository;

    // public List<OrderProduct> findByOrderId(int orderId) {
    // return repository.findByOrderId(orderId);
    // }

    public List<OrderProduct> findByOrderId(int orderId) {
        return repository.findByOrderId("" + orderId);
    }
}

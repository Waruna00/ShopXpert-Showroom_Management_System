package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.app.model.Order;
import com.app.model.OrderProduct;
import com.app.request.AddOrderProduct;
import com.app.request.GetOrder;
import com.app.request.GetProduct;
import com.app.model.OrderProductKey;
import com.app.model.Product;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

        private final com.app.repository.OrderRepo repository;
        private final com.app.repository.ProductRepo productRepository;
        private final com.app.repository.OrderRepo orderRepository;
        private final com.app.repository.OrderProductRepo orderProductRepository;

        public Order addOrder(Order request) {
                var order = Order.builder()
                                .date(request.getDate())
                                .orderStatus(request.getOrderStatus())
                                .build();

                repository.save(order);
                return Order.builder()
                                .orderId(order.getOrderId())
                                .date(order.getDate())
                                .orderStatus(order.getOrderStatus())
                                .build();
        }

        public AddOrderProduct addOrderProduct(AddOrderProduct request) {
                var orderProduct = OrderProduct.builder()
                                .id(OrderProductKey.builder()
                                                .orderId(request.getOrderid())
                                                .productCode(request.getProductcode())
                                                .build())
                                .order(orderRepository.findById("" + request.getOrderid())
                                                .orElseThrow(() -> new RuntimeException("product not found")))
                                .product(productRepository.findById(request.getProductcode())
                                                .orElseThrow(() -> new RuntimeException("product not found")))
                                .quantity(request.getQuantity())
                                .build();

                orderProductRepository.save(orderProduct);
                return AddOrderProduct.builder()
                                .orderid(orderProduct.getOrder().getOrderId())
                                .productcode(orderProduct.getProduct().getProduct_code())
                                .quantity(orderProduct.getQuantity())
                                .build();
        }

        public Order findOrderById(String id) {
                var order = repository.findById(id)
                                .orElseThrow(() -> new RuntimeException("order not found"));
                order.getOrderProducts().size(); // Eagerly fetch orderProducts
                return order;
        }

        public List<OrderProduct> findOrderProductsByOrderId(GetOrder request) {
                return orderProductRepository.findByOrderId(request.getOrderid());
        }

        
}

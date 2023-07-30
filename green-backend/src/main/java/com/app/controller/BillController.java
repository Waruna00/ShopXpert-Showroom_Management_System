package com.app.controller;

import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.app.model.Bill;
import com.app.model.BillProduct;
import com.app.model.BillProductKey;
import com.app.model.Product;
import com.app.request.BillProductRequest;
import com.app.request.CreateBillRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/bill")
@RequiredArgsConstructor
public class BillController {

    @Autowired
    private final com.app.service.BillService service;

    @Autowired
    private final com.app.repository.BillRepo repository;

    @Autowired
    private final com.app.repository.ProductRepo productRepo;

    @Autowired
    private final com.app.service.BillProductRepository billProductRepository;

    @Autowired
    private final com.app.repository.UserRepo userRepo;

    @PostMapping("/create")
    public ResponseEntity<CreateBillRequest> create(
            @RequestBody CreateBillRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PostMapping("/createbill")
    public Integer createBill(@RequestBody CreateBillRequest request) {
        // Create a new bill entity
        Bill bill = new Bill();
        bill.setUser(userRepo.findById(request.getUser()).orElseThrow(() -> new RuntimeException("cashier not found")));
        bill.setBillDate(LocalDate.now());
        bill.setBillTime((Time.valueOf(LocalTime.now())));
        bill.setTotal(request.getTotal());
        bill.setStatus("Success");
        // Save the bill entity to the database
        bill = repository.save(bill);

        // Create a new bill product entity for each product in the request
        for (BillProductRequest productRequest : request.getProducts()) {
            // Find the product entity by product code
            Product product = productRepo.findByProductCode(productRequest.getProductCode());

            // Create a new bill product entity
            BillProduct billProduct = new BillProduct();
            billProduct.setBill(bill);
            billProduct.setProduct(product);
            billProduct.setQuantity(productRequest.getQuantity());
            BillProductKey billProductKey = new BillProductKey();
            billProductKey.setProductCode(productRequest.getProductCode());
            billProductKey.setInvoiceNo(bill.getInvoiceNo());
            billProduct.setId(billProductKey);

            // Save the bill product entity to the database
            billProductRepository.save(billProduct);

        }

        return bill.getInvoiceNo();
    }
}

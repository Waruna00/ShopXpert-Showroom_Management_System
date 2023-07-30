package com.app.service;

import java.sql.Time;
import org.springframework.stereotype.Service;
import com.app.model.Bill;
import com.app.model.BillProduct;
import com.app.model.Product;
import com.app.request.BillProductRequest;
import com.app.request.CreateBillRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillService {

    private final com.app.repository.BillRepo repository;
    private final com.app.repository.UserRepo userRepo;
    private final com.app.repository.ProductRepo productRepo;
    private final com.app.service.BillProductRepository billProductRepository;

    public CreateBillRequest create(CreateBillRequest request) {

        var bill = Bill.builder()
                .invoiceNo(request.getInvoice())
                .user(userRepo.findById(request.getUser()).orElseThrow(() -> new RuntimeException("cashier not found")))
                .BillDate(request.getDate())
                .BillTime(Time.valueOf(request.getTime()))
                .Total(request.getTotal())
                .Status("Success")
                .build();
        repository.save(bill);

        return CreateBillRequest.builder()
                .invoice(bill.getInvoiceNo())
                .date(bill.getBillDate())
                .time(String.valueOf(bill.getBillTime()))
                .total(bill.getTotal())
                .build();
    }

    public Bill createBill(CreateBillRequest request) {
        // Create a new bill entity
        Bill bill = new Bill();
        bill.setUser(userRepo.findById(request.getUser()).orElseThrow(() -> new RuntimeException("cashier not found")));

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

            // Save the bill product entity to the database
            billProductRepository.save(billProduct);
        }

        return bill;
    }

}

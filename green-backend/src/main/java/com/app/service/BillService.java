package com.app.service;

import java.sql.Time;
import org.springframework.stereotype.Service;
import com.app.model.Bill;
import com.app.request.CreateBillRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillService {

    private final com.app.repository.BillRepo repository;
    private final com.app.repository.UserRepo userRepo;

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

}

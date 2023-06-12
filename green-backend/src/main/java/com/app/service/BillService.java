package com.app.service;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.springframework.stereotype.Service;
import com.app.model.Bill;
import com.app.request.CreateBillRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillService {

    private final com.app.repo.BillRepo repository;

    public CreateBillRequest create(CreateBillRequest request) {

        var bill = Bill.builder()
                .InvoiceNo(request.getInvoice())
                .BillDate(LocalDate.now())
                .BillTime(LocalTime.now())
                .Total(request.getTotal())
                .Status("Success")
                .build();
        repository.save(bill);

        return CreateBillRequest.builder()
                .invoice(bill.getInvoiceNo())
                // .BillDate(bill.getBillDate())
                // .BillTime(bill.getBillTime())
                .total(bill.getTotal())
                // .Status(bill.getStatus())
                .build();
    }

}

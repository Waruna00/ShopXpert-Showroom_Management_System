package com.app.service;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import com.app.model.InwardInvoice;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InwardInvoiceService {

    private final com.app.repository.InwardInvoiceRepo repository;

    public InwardInvoice addInvoice() {
        InwardInvoice invoice = new InwardInvoice();
        invoice.setDate(LocalDate.now());
        return repository.save(invoice);
    }

}

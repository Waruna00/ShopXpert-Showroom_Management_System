package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Bill;

public interface BillRepo extends JpaRepository<Bill, Integer> {

    Optional<Bill> findByInvoiceNo(int InvoiceNo);

}

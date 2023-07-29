package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.InwardInvoice;

public interface InwardInvoiceRepo extends JpaRepository<InwardInvoice, Integer> {
}

package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Inward_Invoice;

public interface InwardInvoiceRepo extends JpaRepository<Inward_Invoice, String> {
}

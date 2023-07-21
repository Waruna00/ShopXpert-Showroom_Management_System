package com.app.repo;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Inward_Invoice;


public interface InwardInvoiceRepo extends JpaRepository<Inward_Invoice, String> {
    
     Optional<Inward_Invoice> findByInvoice(int invoice);
}

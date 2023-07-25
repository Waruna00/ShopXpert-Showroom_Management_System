package com.app.model;

import com.app.model.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int invoiceNo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate BillDate;
    private Time BillTime;
    private String Total;
    private String Status;


    // Relationships
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(name = "bill_product", joinColumns = @JoinColumn(name = "invoiceNo"), inverseJoinColumns = @JoinColumn(name = "product_code"))
    Set<Product> bill_products;

    @ManyToMany
    @JoinTable(name = "bill_item", joinColumns = @JoinColumn(name = "invoiceNo"), inverseJoinColumns = @JoinColumn(name = "serial_no"))
    Set<Item> bill_items;

    // Getters and Setters
    public int getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(int invoice_No) {
        invoiceNo = invoice_No;
    }

    public LocalDate getBillDate() {
        return BillDate;
    }

    public void setBillDate(LocalDate billDate) {
        BillDate = billDate;
    }

    public Time getBillTime() {
        return BillTime;
    }

    public void setBillTime(Time billTime) {
        BillTime = billTime;
    }

    public String getTotal() {
        return Total;
    }

    public void setTotal(String total) {
        Total = total;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }
}

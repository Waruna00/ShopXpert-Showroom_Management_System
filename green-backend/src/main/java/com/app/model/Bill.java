package com.app.model;

import com.app.model.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
    @GeneratedValue
    private int invoiceNo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate BillDate;
    private Time BillTime;
    private String Total;
    private String Status;

    // Relationships
    // @ManyToMany
    // private Set<Item> items;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @OneToMany(mappedBy = "bill")
    private Set<Item> item;

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

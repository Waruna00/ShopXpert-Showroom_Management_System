package com.app.model;

import com.app.model.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import org.joda.time.LocalDate;
import org.joda.time.LocalTime;

@Entity
@Table(name = "Bill")
public class Bill {
    @Id
    private String InvoiceNo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate BillDate;
    private LocalTime BillTime;
    private String Total;
    private String Status;

    // Relationships
    @ManyToMany
    private Set<Item> items;

    @OneToMany(mappedBy = "bill")
    private Set<Customer> Cus_Code;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private User user;

    // Getters and Setters
    public String getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public LocalDate getBillDate() {
        return BillDate;
    }

    public void setBillDate(LocalDate billDate) {
        BillDate = billDate;
    }

    public LocalTime getBillTime() {
        return BillTime;
    }

    public void setBillTime(LocalTime billTime) {
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

package com.alibou.security.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import java.util.Set;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;

@Entity
public class Bill {
    @Id
    private String InvoiceNo;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate BillDate;
    private LocalTime BillTime;
    private String Total;
    private String Status;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "MY_USER_ID")
    @JsonManagedReference
    private Set<Customer> bankAccounts;
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
    public String getCusCode() {
        return CusCode;
    }
    public void setCusCode(String cusCode) {
        CusCode = cusCode;
    }
    public String getCashierCode() {
        return CashierCode;
    }
    public void setCashierCode(String cashierCode) {
        CashierCode = cashierCode;
    }
    private String CusCode;
    private String CashierCode;
    

    
}

package com.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Customer")
public class Customer {
    @Id
    private String Cus_Code;
    private String First_Name;
    private String Last_Name;
    private String Address;
    private String Phone;
    private String Email;
    private String NIC;

    //Relationships
    @ManyToOne
    @JoinColumn(name="InvoiceNo", nullable=false)
    private Bill bill;

    


    //Getters and Setters
    public String getCus_Code() {
        return Cus_Code;
    }
    public void setCus_Code(String cus_Code) {
        Cus_Code = cus_Code;
    }
    public String getFirst_Name() {
        return First_Name;
    }
    public void setFirst_Name(String first_Name) {
        First_Name = first_Name;
    }
    public String getLast_Name() {
        return Last_Name;
    }
    public void setLast_Name(String last_Name) {
        Last_Name = last_Name;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String address) {
        Address = address;
    }
    public String getPhone() {
        return Phone;
    }
    public void setPhone(String phone) {
        Phone = phone;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getNIC() {
        return NIC;
    }
    public void setNIC(String nIC) {
        NIC = nIC;
    }
}

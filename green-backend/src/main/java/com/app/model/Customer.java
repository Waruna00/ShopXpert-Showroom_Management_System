package com.app.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(generator = "increment")
    private int cuscode;
    private String firstname;
    private String lastname;
    private String address;
    private String phone;
    private String email;
    private String nic;

    // Relationships
    @OneToMany(mappedBy = "customer")
    private List<Bill> bills;

    @OneToMany(mappedBy = "customer")
    private List<RepairService> repairServices;

    // Getters and Setters
    public int getCuscode() {
        return cuscode;
    }

    public void setCus_Code(int cus_Code) {
        cuscode = cus_Code;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String first_Name) {
        firstname = first_Name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastnme(String last_Name) {
        lastname = last_Name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String Address) {
        address = Address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String Phone) {
        phone = Phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        email = Email;
    }

    public String getNic() {
        return nic;
    }

    public void setNIC(String nIC) {
        nic = nIC;
    }
}

package com.app.model;

import java.util.Set;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

public class ItemBill {
    
    @ManyToMany
@JoinTable(
  name = "ItemBill", 
  joinColumns = @JoinColumn(name = "serial_no"), 
  inverseJoinColumns = @JoinColumn(name = "InvoiceNo"))
    Set<Bill> itemBills;
}

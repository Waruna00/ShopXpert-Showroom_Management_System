package com.app.model;

import java.time.LocalDate;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
public class ItemBill {

  @ManyToMany
  @JoinTable(name = "ItemBill", joinColumns = @JoinColumn(name = "serial_no"), inverseJoinColumns = @JoinColumn(name = "InvoiceNo"))
  Set<Bill> itemBills;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate Date;

  public LocalDate getDate() {
    return Date;
  }

  public void setDate(LocalDate date) {
    Date = date;
  }
}

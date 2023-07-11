package com.app.model;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Item")
public class Item {
    @Id
    private String serial_no;

    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate Inward;

    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate Outward;

    @ManyToOne
    @JoinColumn(name = "product_code", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "invoice_no", nullable = true)
    private Bill bill;

    // @ManyToMany(mappedBy="items")
    // private Set<Bill> bills;
}

package com.app.model;

import java.time.LocalDate;
import java.util.List;

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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "repair_service")
public class RepairService {

    @GeneratedValue(generator = "increment")
    @Id
    private int serviceno;
    private String item_name;
    private String serial;
    private String description;
    private String status;
    private String estimation;
    private String cost;
    private LocalDate date;
    private String item_description;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "repairService")
    private List<RepairInvoice> repairInvoice;

    // Getters and Setters

}

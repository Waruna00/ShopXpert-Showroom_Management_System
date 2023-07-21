package com.app.model;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Inward_Invoice")
public class Inward_Invoice {

    @Id
    @GeneratedValue
    private int invoice_no;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @OneToMany(mappedBy = "inward_invoice")
    private Set<Item> items;

    // setters
    public void setInvoice_no(int invoice_no) {
        this.invoice_no = invoice_no;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

}

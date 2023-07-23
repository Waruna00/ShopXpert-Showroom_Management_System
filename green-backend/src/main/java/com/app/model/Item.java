package com.app.model;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @JoinColumn(name = "outward_invoice_no", nullable = true)
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "inward_invoice_no", nullable = true)
    private Inward_Invoice inward_invoice;

    // @ManyToMany(mappedBy="items")
    // private Set<Bill> bills;
}

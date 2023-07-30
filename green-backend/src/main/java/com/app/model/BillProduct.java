package com.app.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name = "bill_product")
public class BillProduct {
    @EmbeddedId
    BillProductKey id;

    @ManyToOne
    @MapsId("Product_code")
    @JoinColumn(name = "product_code")
    Product product;

    @ManyToOne
    @MapsId("invoiceNo")
    @JoinColumn(name = "invoiceNo")
    Bill bill;
    int quantity;
}

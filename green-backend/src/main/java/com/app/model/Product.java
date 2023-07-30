package com.app.model;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonPropertyOrder({ "Product_code", "Name", "Description", "Price", "items", "orders" })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "product_code")
    private String productCode;
    private String name;
    private String description;
    private String price;

    @OneToMany(mappedBy = "product")
    private Set<Item> items;

    @OneToMany(mappedBy = "product")
    private Set<OrderProduct> orderProducts;

    @OneToMany(mappedBy = "product")
    private Set<BillProduct> billProducts;

    public String getProductCode() {
        return productCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String newName) {
        name = newName;
    }

    public String getDescription() {
        return description;
    }

    public String getPrice() {
        return price;
    }

}

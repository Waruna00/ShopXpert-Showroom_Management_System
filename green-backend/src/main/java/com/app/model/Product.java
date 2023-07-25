package com.app.model;

import java.util.List;
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
    private String Product_code;
    private String Name;
    private String Description;
    private String Price;

    @OneToMany(mappedBy = "product")
    private Set<Item> items;

    // @ManyToMany
    // @JoinTable(name = "order_product", joinColumns = @JoinColumn(name =
    // "product_code"), inverseJoinColumns = @JoinColumn(name = "order_id"))
    // Set<Order> orders;

    @OneToMany(mappedBy = "product")
    private Set<OrderProduct> orderProducts;

    public String getProduct_code() {
        return Product_code;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return Description;
    }

    public String getPrice() {
        return Price;
    }

}

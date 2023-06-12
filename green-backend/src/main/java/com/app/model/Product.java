package com.app.model;

import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

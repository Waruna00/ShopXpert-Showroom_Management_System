package com.app.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Product")
public class Product {
    @Id
    private String Product_code;
    private String Name;
    private String Description;
    private String Price;

    
    @OneToMany(mappedBy="product")
    private Set<Item> items;


    public String getProduct_code() {
        return Product_code;
    }


    public void setProduct_code(String product_code) {
        Product_code = product_code;
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


    public void setDescription(String description) {
        Description = description;
    }


    public String getPrice() {
        return Price;
    }


    public void setPrice(String price) {
        Price = price;
    }
}

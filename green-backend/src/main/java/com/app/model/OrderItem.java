package com.app.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class OrderItem {
    @EmbeddedId
    OrderProductKey id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_number")
    Order order;

    @ManyToOne
    @MapsId("serial_no")
    @JoinColumn(name = "serial_no")
    Item item;

}

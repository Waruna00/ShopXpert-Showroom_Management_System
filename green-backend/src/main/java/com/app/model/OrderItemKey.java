package com.app.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
class OrderItemKey implements Serializable {

    @Column(name = "order_number")
    int order_id;

    @Column(name = "serial_no")
    String serial_no;

}
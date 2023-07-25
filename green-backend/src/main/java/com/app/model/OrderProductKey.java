package com.app.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderProductKey implements Serializable {

    @Column(name = "order_number")
    int orderId;

    @Column(name = "product_code")
    String productCode;

    @Builder
    public static OrderProductKey create(int orderId, String productCode) {
        return new OrderProductKey(orderId, productCode);
    }

}
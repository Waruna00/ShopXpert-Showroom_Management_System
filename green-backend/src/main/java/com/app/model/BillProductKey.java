package com.app.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class BillProductKey implements Serializable {

    @Column(name = "invoice_no")
    private Integer invoiceNo;

    @Column(name = "product_code")
    String productCode;

    public void setInvoiceNo(Integer invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public Integer getInvoiceNo() {
        return invoiceNo;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductCode() {
        return productCode;
    }

}

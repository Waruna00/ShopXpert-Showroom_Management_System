package com.app.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateItemRequest {

    private String serial_no;
    private String status;
    private String product_code;
    private int inward_invoice_no;
    
}

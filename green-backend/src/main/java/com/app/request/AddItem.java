package com.app.request;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddItem {
    private String serial_no;
    private LocalDate inward;
    private LocalDate outward;
    private int inward_invoice_no;
    private int outward_invoice_no;
    private String product_code;
    private String status;

}

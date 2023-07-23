package com.app.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddRepairRequest {
    private String itemname;
    private String serial;
    private String description;
    private String status;
    private String estimation;
    private int customer;
    private String itemdescription;
}

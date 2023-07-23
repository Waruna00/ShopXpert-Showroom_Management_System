package com.app.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddRepair {
    private String itemName;
    private String itemSerialNo;
    private String itemDescription;
    private String customerCode;
    private String repairDetails;
    private String estimation;
    private String status;
}

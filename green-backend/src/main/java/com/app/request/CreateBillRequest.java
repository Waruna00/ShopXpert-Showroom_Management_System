package com.app.request;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateBillRequest {

    private int invoice;
    private LocalDate date;
    private String time;
    private Float total;
    private int user;
    private int quantity;
    private List<BillProductRequest> products;

}

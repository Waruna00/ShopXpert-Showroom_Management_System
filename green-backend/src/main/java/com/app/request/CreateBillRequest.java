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
public class CreateBillRequest {

    private int invoice;
    private LocalDate date;
    private String time;
    private String total;
    private int user;

}

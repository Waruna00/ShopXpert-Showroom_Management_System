package com.app.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddResponse {
    @JsonProperty("Product_code")
    private String Product_code;
    @JsonProperty("Name")
    private String Name;
    @JsonProperty("Description")
    private String Description;
    @JsonProperty("Price")
    private String Price;
}

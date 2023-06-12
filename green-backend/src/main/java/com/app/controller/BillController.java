package com.app.controller;

import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.app.request.CreateBillRequest;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/bill")
@RequiredArgsConstructor
public class BillController {

    @Autowired
    private final com.app.service.BillService service;

    @PostMapping("/create")
    public ResponseEntity<CreateBillRequest> create(
            @RequestBody CreateBillRequest request) {
        return ResponseEntity.ok(service.create(request));
    }
}

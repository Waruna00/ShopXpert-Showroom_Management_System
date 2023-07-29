package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.model.InwardInvoice;
import com.app.service.InwardInvoiceService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/inwardinvoice")
@RequiredArgsConstructor
public class InwardInvoiceController {

    @Autowired
    private final InwardInvoiceService service;

    @GetMapping("/addinvoice")
    public ResponseEntity<InwardInvoice> addInvoice() {
        return ResponseEntity.ok(service.addInvoice());
    }
}

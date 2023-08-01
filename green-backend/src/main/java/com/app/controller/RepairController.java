package com.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.app.model.RepairService;
import com.app.request.AddRepairRequest;
import com.app.request.GetRepair;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/technician")
@RequiredArgsConstructor
public class RepairController {
    @Autowired
    private final com.app.service.RepairServiceService service;

    @PostMapping("/addrepair")
    public ResponseEntity<AddRepairRequest> add(
            @RequestBody AddRepairRequest request) {
        return ResponseEntity.ok(service.addRepairService(request));
    }

    @GetMapping("/getlastrepair")
    public ResponseEntity<RepairService> get() {
        return ResponseEntity.ok(service.getLastRepairService());
    }

    @GetMapping("/getall")
    public ResponseEntity<java.util.List<RepairService>> getAll() {
        return ResponseEntity.ok(service.getAllRepairService());
    }

    @PostMapping("/findbyid")
    public Optional<Optional<RepairService>> findByServiceNumber(@RequestBody GetRepair invoice) {
        Optional<RepairService> repair = service.findById(invoice.getInvoiceno());
        if (repair.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(repair);
    }

    @PutMapping("/update")
    public ResponseEntity<RepairService> update(@RequestBody RepairService repairService) {
        RepairService updatedRepairService = this.service.update(repairService);
        if (updatedRepairService == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRepairService);
    }

    @PutMapping("/updatestatus")
    public ResponseEntity<RepairService> updateStatus(@RequestParam String serviceNo, @RequestParam String newStatus) {
        RepairService updatedRepairService = this.service.updateStatus(serviceNo, newStatus);
        if (updatedRepairService == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRepairService);
    }
}

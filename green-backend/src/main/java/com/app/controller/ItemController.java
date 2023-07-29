package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.model.Item;
import com.app.request.AddItem;
import com.app.request.UpdateItemRequest;
import com.app.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/item")
@RequiredArgsConstructor
public class ItemController {

    @Autowired
    private final ItemService itemService;

    @PostMapping("/additem")
    public ResponseEntity<Item> addItem(@RequestBody AddItem request) {
        var item = itemService.addItem(request);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/pendingitems")
    public List<Item> findByStatus() {
        return itemService.findByStatus("PEN");
    }

    @PutMapping("/updateitem")
    public ResponseEntity<Item> updateItem(@RequestBody UpdateItemRequest request) {
        Item updatedItem = itemService.updateItem(request);
        if (updatedItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

}
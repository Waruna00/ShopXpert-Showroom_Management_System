package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.model.Item;
import com.app.model.Product;
import com.app.request.AddItem;
import com.app.request.UpdateItemRequest;
import com.app.request.UpdateItemStatusRequest;
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
        request.setStatus("PEN"); // Set the status of the new item to "PEN"
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

    @GetMapping("/availableitems")
    public List<Item> findAvailableItemsByProduct(@RequestParam String productId) {
        Product product = new Product();
        product.setProductCode(productId);
        return itemService.findAvailableItemsByProduct(product);
    }

    @GetMapping("/availableitemscount")
    public int findAvailableItemsCountByProduct(@RequestParam String productId) {
        Product product = new Product();
        product.setProductCode(productId);
        return (itemService.findAvailableItemsByProduct(product)).size();
    }

    @PutMapping("/updateitemstatus")
    public ResponseEntity<Void> updateItemStatus(@RequestBody UpdateItemStatusRequest request) {
        itemService.updateItemStatus(request.getSerials(), request.getStatus(), request.getBillNo());
        return ResponseEntity.ok().build();
    }

    // @PostMapping("/additem")
    // public ResponseEntity<Item> addItemManager(@RequestBody AddItem request) {
    // request.setStatus("PEN"); // Set the status of the new item to "PEN"
    // var item = itemService.addItem(request);
    // return ResponseEntity.ok(item);
    // }

}
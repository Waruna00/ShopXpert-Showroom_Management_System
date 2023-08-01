package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.model.Item;
import com.app.model.Product;
import com.app.request.AddItem;
import com.app.request.UpdateItemRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final com.app.repository.ItemRepo repository;
    private final com.app.repository.ProductRepo productRepository;
    private final com.app.repository.InwardInvoiceRepo inwardRepository;
    private final com.app.repository.BillRepo billRepository;

    public Item addItem(AddItem request) {
        var item = new Item();
        item.setSerial_no(request.getSerial_no());
        item.setStatus(request.getStatus());
        item.setAddedDate(LocalDate.now());
        item.setProduct(productRepository.findById(request.getProduct_code())
                .orElseThrow(() -> new RuntimeException("Product not found")));
        return repository.save(item);
    }

    public List<Item> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    public Item updateItem(UpdateItemRequest request) {
        Optional<Item> optionalItem = repository.findById(request.getSerial_no());
        if (!optionalItem.isPresent()) {
            return null;
        }
        Item item = optionalItem.get();
        item.setInward(LocalDate.now());
        item.setStatus(request.getStatus());
        item.setInward_invoice(inwardRepository.findById(request.getInward_invoice_no())
                .orElseThrow(() -> new RuntimeException("Inward invoice not found")));
        return repository.save(item);
    }

    public List<Item> findAvailableItemsByProduct(Product product) {
        return repository.findByProductAndStatus(product, "AVL");
    }

    public void updateItemStatus(List<String> serial_nos, String newStatus, int billNo) {
        for (String serial : serial_nos) {
            Item item = repository.findById(serial).orElse(null);
            if (item != null) {
                item.setStatus(newStatus);
                item.setBill(billRepository.findById(billNo).orElse(null));
                repository.save(item);
            }
        }
    }
}

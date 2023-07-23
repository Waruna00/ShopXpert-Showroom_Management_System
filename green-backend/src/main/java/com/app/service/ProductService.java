package com.app.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.app.model.Item;
import com.app.model.Product;
import com.app.request.AddItem;
import com.app.request.AddProduct;
import com.app.request.GetProduct;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final com.app.repo.ProductRepo repository;
    private final com.app.repo.ItemRepo itemRepo;
    private final com.app.repo.BillRepo billRepo;
    private final com.app.repo.InwardInvoiceRepo inwardInvoiceRepo;

    public AddProduct addProduct(AddProduct request) {
        var product = Product.builder()
                .Product_code(request.getProductcode())
                .Name(request.getName())
                .Description(request.getDescription())
                .Price(request.getPrice())
                .build();

        repository.save(product);
        return AddProduct.builder()
                .productcode(product.getProduct_code())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }

//     public AddItem addItem(AddItem request) {

//         var bill = billRepo.findByInvoiceNo(request.getOutward_invoice_no())
//                 .orElseThrow(() -> new RuntimeException("product not found"));
        
//         var inwardInvoice = inwardInvoiceRepo.findByInvoice(request.getInward_invoice_no())
//                 .orElseThrow(() -> new RuntimeException("product not found"));

//         var product = repository.findByProduct_Code(request.getProduct_code())
//                 .orElseThrow(() -> new RuntimeException("product not found")); 

//         var item = Item.builder()
//                 .serial_no(request.getSerial_no())
//                 .Inward(request.getInward())
//                 .Outward(request.getOutward())
//                 .bill(bill)
//                 .inward_invoice(inwardInvoice)
//                 .product(product)
//                 .build();

//         itemRepo.save(item);

//         return AddItem.builder()
//                 .serial_no(item.getSerial_no())
//                 .inward(item.getInward())
//                 .outward(item.getOutward())
//                 .inward_invoice_no(item.getInward_invoice().getInvoice_no())
//                 .outward_invoice_no(item.getBill().getInvoiceNo())
//                 .product_code(item.getProduct().getProduct_code())
//                 .build();
//     }



    public Optional<Product> getProduct(GetProduct request) {
        Optional<Product> product = repository.findById(request.getProductcode());

        return product;

    }

    public List<Product> findAll(){
        List<Product> product = repository.findAll();

        return product;
    }

    // public deleteProduct(GetProduct request) {
    //     repository.deleteById(request.getProductcode());
    // }
}

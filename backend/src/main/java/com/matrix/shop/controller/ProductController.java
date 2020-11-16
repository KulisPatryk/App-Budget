package com.matrix.shop.controller;

import com.matrix.shop.model.entity.Product;
import com.matrix.shop.model.entity.Worker;
import com.matrix.shop.repository.ProductRepository;
import com.matrix.shop.repository.WorkerRepository;
import com.matrix.shop.service.ProductService;
import com.matrix.shop.service.WorkerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    private final ProductRepository productRepository;
    ProductController (ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    @GetMapping("/all")
    public List<Product> all(){
        var allProducts = this.productService.findAll();
        return allProducts;
    }
    @PostMapping("/all")
    Product newProduct(@RequestBody Product newProduct){
        return productRepository.save(newProduct);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(value = "id") UUID id){
        Product product = productRepository.findById(id).orElseThrow();
        productRepository.delete(product);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/product/")
    public Product update(@RequestBody Product productObj){
        return productRepository.save(productObj);
    }
}

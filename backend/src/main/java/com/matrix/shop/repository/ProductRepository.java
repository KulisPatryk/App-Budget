package com.matrix.shop.repository;

import com.matrix.shop.model.entity.Product;
import com.matrix.shop.model.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    public List<Product> findAllByOrderByDataDesc();
}

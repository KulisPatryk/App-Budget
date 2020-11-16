package com.matrix.shop.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@Table(name="Products")
public class Product {
    protected Product(){
        this.id = UUID.randomUUID();
        this.data = new Timestamp(System.currentTimeMillis());
    }
    @Id
    private UUID id;

    @Column(name="name",length = 30)
    private String name;
    @Column(name="category",length = 30)
    private String category;
    @Column(name="Price", columnDefinition = "Decimal(10,2) default 0.00")
    private Float price;
    @Column(name="Quantity", columnDefinition = "Integer default 0")
    private Integer quantity;

    private Timestamp data;
}
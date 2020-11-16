package com.matrix.shop.model.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.matrix.shop.model.json.Views;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name="Income")
public class Income {
    protected Income(){
        this.id = UUID.randomUUID();
        this.data = new Timestamp(System.currentTimeMillis());
    }
    @Id
    @JsonView(Views.ExpenditureView.class)
    private UUID id;

    @Column(name="name",length = 30)
    @JsonView(Views.ExpenditureView.class)
    private String name;
    @Column(name="price", columnDefinition = "Decimal(10,2) default 0.00")
    @JsonView(Views.ExpenditureView.class)
    private Float price;
    @Column(name="kind", length = 30)
    @JsonView(Views.ExpenditureView.class)
    private String kind;
    @Column(name="category", length=20)
    @JsonView(Views.ExpenditureView.class)
    private String category;
    @Column(name="date")
    @JsonView(Views.ExpenditureView.class)
    private LocalDate date;

    private Timestamp data;
}
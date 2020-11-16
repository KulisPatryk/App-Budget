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
@Table(name="Expenditures")
public class Expenditure {
    protected Expenditure(){
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
    @Column(name="place", length = 30)
    @JsonView(Views.ExpenditureView.class)
    private String place;
    @Column(name="category", length=20)
    @JsonView(Views.ExpenditureView.class)
    private String category;
    @Column(name="date")
    @JsonView(Views.ExpenditureView.class)
    private LocalDate date;

    private Timestamp data;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Timestamp getData() {
        return data;
    }

    public void setData(Timestamp data) {
        this.data = data;
    }
}

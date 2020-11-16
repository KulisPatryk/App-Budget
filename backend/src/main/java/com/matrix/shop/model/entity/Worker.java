package com.matrix.shop.model.entity;


import com.fasterxml.jackson.annotation.JsonView;
import com.matrix.shop.model.json.Views;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@Table(name="Workers")
public class Worker {
    protected Worker(){
        this.id = UUID.randomUUID();
        this.data = new Timestamp(System.currentTimeMillis());
    }
    @Id
    @JsonView(Views.WorkerView.class)
    private UUID id;

    @Column(name="name",length = 15)
    private String name;
    @Column(name="surname",length = 30)
    private String surname;
    @Column(name="email",length = 30)
    private String email;
    @Column(name="phone",length = 20)
    private String phone;

    private Timestamp data;
}

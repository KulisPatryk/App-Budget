package com.matrix.shop.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Income;
import com.matrix.shop.model.json.Views;
import com.matrix.shop.repository.ExpenditureRepository;
import com.matrix.shop.repository.IncomeRepository;
import com.matrix.shop.service.ExpenditureService;
import com.matrix.shop.service.IncomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@Slf4j
@RequestMapping("/income")
@CrossOrigin(origins = "*")
public class IncomeController  {

    @Autowired
    private IncomeService incomeService;

    private final IncomeRepository repository;
    IncomeController (IncomeRepository repository){
        this.repository = repository;
    }
    @GetMapping("/all")
    @JsonView({Views.ExpenditureView.class})
    public List<Income> all(){
        var allIncome = this.incomeService.findAll();
        return allIncome;
    }
    @PostMapping("/all")
    Income newIncome(@RequestBody Income newIncome){
        return repository.save(newIncome);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable(value = "id") UUID id){
        Income income = repository.findById(id).orElseThrow();
        repository.delete(income);
        return ResponseEntity.ok().build();
    }

}
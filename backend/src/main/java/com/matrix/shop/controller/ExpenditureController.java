package com.matrix.shop.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.json.Views;
import com.matrix.shop.repository.ExpenditureRepository;
import com.matrix.shop.service.ExpenditureService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/expenditures")
@CrossOrigin(origins = "*")
public class ExpenditureController {

    @Autowired
    private ExpenditureService expenditureService;

    private final ExpenditureRepository repository;
    ExpenditureController (ExpenditureRepository repository){
        this.repository = repository;
    }
    @GetMapping("/all")
    @JsonView({Views.ExpenditureView.class})
    public List<Expenditure> all(){
        var allExpenditures = this.expenditureService.findAll();
        return allExpenditures;
    }
    @PostMapping("/all")
    Expenditure newExpenditure(@RequestBody Expenditure newExpenditure){
        return repository.save(newExpenditure);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpenditure(@PathVariable(value = "id") UUID id){
        Expenditure expenditure = repository.findById(id).orElseThrow();
        repository.delete(expenditure);
        return ResponseEntity.ok().build();
    }

}

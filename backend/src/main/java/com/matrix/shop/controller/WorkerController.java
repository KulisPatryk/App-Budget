package com.matrix.shop.controller;

import com.matrix.shop.model.entity.Worker;
import com.matrix.shop.repository.WorkerRepository;
import com.matrix.shop.service.WorkerService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/workers")
@CrossOrigin(origins = "*")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    private final WorkerRepository repository;
    WorkerController (WorkerRepository repository){
        this.repository = repository;
    }
    @GetMapping("/all")
    public List<Worker> all(){
        var allWorker = this.workerService.findAll();
        return allWorker;
    }
    @PostMapping("/all")
    Worker newWorker(@RequestBody Worker newWorker){
        return repository.save(newWorker);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorker(@PathVariable(value = "id") UUID id){
        Worker worker = repository.findById(id).orElseThrow();
        repository.delete(worker);
        return ResponseEntity.ok().build();
    }

}

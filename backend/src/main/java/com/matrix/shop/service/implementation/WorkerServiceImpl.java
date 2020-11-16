package com.matrix.shop.service.implementation;

import com.matrix.shop.model.entity.Worker;
import com.matrix.shop.repository.WorkerRepository;
import com.matrix.shop.service.WorkerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Override
    public List<Worker> findAll(){
        return workerRepository.findAllByOrderByDataDesc();
    }
}

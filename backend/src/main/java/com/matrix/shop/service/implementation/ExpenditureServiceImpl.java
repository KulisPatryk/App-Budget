package com.matrix.shop.service.implementation;

import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Worker;
import com.matrix.shop.repository.ExpenditureRepository;
import com.matrix.shop.repository.WorkerRepository;
import com.matrix.shop.service.ExpenditureService;
import com.matrix.shop.service.WorkerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Slf4j
public class ExpenditureServiceImpl implements ExpenditureService {

    @Autowired
    private ExpenditureRepository expenditureRepository;

    @Override
    public List<Expenditure> findAll(){
        return expenditureRepository.findAllByOrderByDataDesc();
    }
}
package com.matrix.shop.service.implementation;

import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Income;
import com.matrix.shop.repository.ExpenditureRepository;
import com.matrix.shop.repository.IncomeRepository;
import com.matrix.shop.service.ExpenditureService;
import com.matrix.shop.service.IncomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Slf4j
public class IncomeServiceImpl implements IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Override
    public List<Income> findAll(){
        return incomeRepository.findAllByOrderByDataDesc();
    }
}
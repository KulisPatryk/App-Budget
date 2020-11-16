package com.matrix.shop.service;

import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Income;

import java.util.List;

public interface IncomeService {
    public List<Income> findAll();
}
package com.matrix.shop.repository;

import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IncomeRepository extends JpaRepository<Income, UUID> {
    public List<Income> findAllByOrderByDataDesc();
}
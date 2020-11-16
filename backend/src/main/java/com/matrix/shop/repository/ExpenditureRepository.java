package com.matrix.shop.repository;

import com.matrix.shop.model.entity.Expenditure;
import com.matrix.shop.model.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenditureRepository extends JpaRepository<Expenditure, UUID> {
    public List<Expenditure> findAllByOrderByDataDesc();
}
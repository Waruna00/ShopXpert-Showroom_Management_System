package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.RepairService;

public interface RepairServiceRepo extends JpaRepository<RepairService, String> {

    RepairService findTopByOrderByServicenoDesc();

}

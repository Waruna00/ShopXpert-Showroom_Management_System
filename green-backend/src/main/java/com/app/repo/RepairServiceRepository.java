package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.RepairService;

public interface RepairServiceRepository extends JpaRepository<RepairService, String> {

    RepairService findTopByOrderByServicenoDesc();

}

package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.model.Bill;

@Repository
public interface  BillRepo extends JpaRepository<Bill, String> {
    
}

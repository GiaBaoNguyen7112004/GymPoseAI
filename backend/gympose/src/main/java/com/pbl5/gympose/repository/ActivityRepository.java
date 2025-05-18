package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    Page<Activity> findAllByUser_Id(UUID id, Pageable pageable);
}

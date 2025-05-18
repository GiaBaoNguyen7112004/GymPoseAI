package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    List<Activity> findAllByUser_Id(UUID id);
}

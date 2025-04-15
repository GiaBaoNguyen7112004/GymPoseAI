package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    Page<Exercise> findByCategoryId(Pageable pageable, UUID categoryId);

    List<Exercise> findByCategoryId(UUID categoryId);
}

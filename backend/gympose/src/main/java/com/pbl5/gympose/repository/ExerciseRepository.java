package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    Page<Exercise> findByCategoryId(Pageable pageable, UUID categoryId);

    List<Exercise> findByCategoryId(UUID categoryId);

    @Query(value = "SELECT * FROM exercises e WHERE to_tsvector('english', e.name) @@ to_tsquery('english', :query) " +
            "LIMIT CASE WHEN :limit = 'less' THEN 5 ELSE 1000000 END", nativeQuery = true)
    List<Exercise> searchByName(@Param("query") String query, @Param("limit") String limit);
}

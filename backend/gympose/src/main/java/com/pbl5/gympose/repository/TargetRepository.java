package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Target;
import com.pbl5.gympose.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TargetRepository extends JpaRepository<Target, UUID> {
    public List<Target> findByUser_IdAndCreatedAtBetween(UUID userId, LocalDateTime from, LocalDateTime to);

    UUID user(User user);
}

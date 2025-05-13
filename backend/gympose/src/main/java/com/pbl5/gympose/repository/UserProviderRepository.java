package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.UserProvider;
import com.pbl5.gympose.enums.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserProviderRepository extends JpaRepository<UserProvider, UUID> {
    Optional<UserProvider> findByAuthProviderAndProviderId(AuthProvider authProvider, String providerId);
}

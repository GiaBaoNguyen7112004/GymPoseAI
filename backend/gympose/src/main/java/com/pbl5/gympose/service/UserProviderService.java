package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.UserProvider;
import com.pbl5.gympose.enums.AuthProvider;

import java.util.Optional;

public interface UserProviderService {
    Optional<UserProvider> findByAuthProviderAndProviderId(AuthProvider authProvider, String providerId);
}

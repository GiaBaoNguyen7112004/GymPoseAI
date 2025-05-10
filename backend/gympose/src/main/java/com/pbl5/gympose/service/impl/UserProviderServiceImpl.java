package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.UserProvider;
import com.pbl5.gympose.enums.AuthProvider;
import com.pbl5.gympose.repository.UserProviderRepository;
import com.pbl5.gympose.service.UserProviderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProviderServiceImpl implements UserProviderService {
    UserProviderRepository userProviderRepository;

    @Override
    public Optional<UserProvider> findByAuthProviderAndProviderId(AuthProvider authProvider, String providerId) {
        return userProviderRepository.findByAuthProviderAndProviderId(authProvider, providerId);
    }
}

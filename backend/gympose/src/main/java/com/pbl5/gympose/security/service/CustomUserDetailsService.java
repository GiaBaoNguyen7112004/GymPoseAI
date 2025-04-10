package com.pbl5.gympose.security.service;

import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.repository.UserRepository;
import com.pbl5.gympose.security.domain.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return UserPrincipal.createUserPrincipal(userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND)));
    }
}

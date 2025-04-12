package com.pbl5.gympose.config;

import com.pbl5.gympose.entity.Role;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.RoleName;
import com.pbl5.gympose.repository.RoleRepository;
import com.pbl5.gympose.repository.UserRepository;
import com.pbl5.gympose.utils.LogUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppInitConfig {
    PasswordEncoder passwordEncoder;
    AppProperties appProperties;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        LogUtils.info("Initializing application.....");
        return args -> {
            if (userRepository.findByEmail(appProperties.getAdmin().getEmail()).isEmpty()) {
                Role adminRole = roleRepository.save(Role.builder()
                        .name(RoleName.ADMIN.name())
                        .build());

                LogUtils.info(appProperties.getAdmin().getPassword());
                User user = User.builder()
                        .email(appProperties.getAdmin().getEmail())
                        .firstName(appProperties.getAdmin().getFirstName())
                        .isEnabled(true)
                        .lastName(appProperties.getAdmin().getLastName())
                        .password(passwordEncoder.encode(appProperties.getAdmin().getPassword()))
                        .roles(Stream.of(adminRole).toList())
                        .build();

                userRepository.save(user);
                LogUtils.warn("admin user has been created with default password: admin, please change it");
            }
            LogUtils.info("Application initialization completed .....");
        };
    }
}
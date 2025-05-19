package com.pbl5.gympose.config.security;

import com.pbl5.gympose.security.endpoint.JwtAuthEntryPoint;
import com.pbl5.gympose.security.filter.JwtAuthFilter;
import com.pbl5.gympose.service.security.CustomUserDetailsService;
import com.pbl5.gympose.utils.ApiPath;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {
    

    public final String[] PUBLIC_ENDPOINT = {
            ApiPath.AUTH + "/**",
            ApiPath.SWAGGER,
            ApiPath.JWT + "/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/api-docs/**",
            "/v3/api-docs.yaml",
            "/ws/**",
            "/stomp/ws/**"
    };

    public final String[] PUBLIC_GET_ENDPOINT = {
            ApiPath.EXERCISES + "/**",
            ApiPath.CATEGORIES + "/**",
            ApiPath.CATEGORY_EXERCISES + "/**",
            ApiPath.USERS + "/**",
    };

    public final String[] PUBLIC_POST_ENDPOINT = {
            ApiPath.WORKOUT_SUMMARY + ApiPath.WORKOUT_SUMMARY_ERROR + ApiPath.UPLOAD_IMAGE
    };

    public final String[] PUBLIC_PATCH_ENDPOINT = {
            ApiPath.WORKOUT_SUMMARY + ApiPath.WORKOUT_SUMMARY_ERROR + ApiPath.WORKOUT_SUMMARY_IMAGES
    };

    CustomUserDetailsService customUserDetailsService;
    JwtAuthFilter jwtAuthFilter;

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    public JwtAuthEntryPoint jwtAuthEntryPoint() {
        return new JwtAuthEntryPoint();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(jwtAuthEntryPoint()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(daoAuthenticationProvider())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(ApiPath.USERS + ApiPath.USER_PROFILE).authenticated()
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINT).permitAll()
                        .requestMatchers(PUBLIC_POST_ENDPOINT).permitAll()
                        .requestMatchers(PUBLIC_PATCH_ENDPOINT).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}


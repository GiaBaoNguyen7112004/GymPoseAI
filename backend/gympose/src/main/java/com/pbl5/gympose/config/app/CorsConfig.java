package com.pbl5.gympose.config.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Không cho phép credentials để dùng wildcard
        config.addAllowedOrigin("http://localhost:5500, http://127.0.0.1:5500"); // Cho phép tất cả origin
        config.addAllowedHeader("*"); // Cho phép tất cả header
        config.addAllowedMethod("*"); // Cho phép tất cả phương thức
        source.registerCorsConfiguration("/**", config); // Áp dụng cho tất cả endpoint
        return new CorsFilter(source);
    }
}
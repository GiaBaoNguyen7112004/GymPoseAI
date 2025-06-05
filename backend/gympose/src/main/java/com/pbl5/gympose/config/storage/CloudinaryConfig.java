package com.pbl5.gympose.config.storage;

import com.cloudinary.Cloudinary;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(CloudinaryConfigProperies.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryConfig {
    CloudinaryConfigProperies cloudinaryConfigProperies;

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudinaryConfigProperies.getCloudName());
        config.put("api_key", cloudinaryConfigProperies.getApiKey());
        config.put("api_secret", cloudinaryConfigProperies.getApiSecret());
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}
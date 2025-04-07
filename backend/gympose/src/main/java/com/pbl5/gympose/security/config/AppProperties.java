package com.pbl5.gympose.security.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();

    @Getter
    @Setter
    public static class Auth {
        private String accessTokenSecret;
        private long accessTokenExpirationMsec;
        private String refreshTokenSecret;
        private long refreshTokenExpirationMsec;
    }
}

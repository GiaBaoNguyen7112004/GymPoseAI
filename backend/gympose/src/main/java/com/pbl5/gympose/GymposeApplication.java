package com.pbl5.gympose;

import com.pbl5.gympose.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class GymposeApplication {

    public static void main(String[] args) {
        SpringApplication.run(GymposeApplication.class, args);
    }

}

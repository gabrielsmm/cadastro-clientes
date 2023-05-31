package com.gabrielsmm.logistica.config;

import com.gabrielsmm.logistica.services.DbService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig {

    private DbService dbService;

    public TestConfig(DbService dbService) {
        this.dbService = dbService;
    }

    @Bean
    void instanciaBaseDeDados() {
        try {
            dbService.instanciaBaseDeDados();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

package com.kms.openapi_server.config

import org.springframework.boot.actuate.trace.http.HttpTraceRepository
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AppConfig {
    @Bean
    fun httpTraceRepository(): HttpTraceRepository {
        return InMemoryHttpTraceRepository()
    }
}

package com.group3.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        registry.addViewController("/{path:^(?!api|swagger|docs|assets|css|js|images|fonts|webjars|favicon\\.ico|index\\.html|.*\\..+$).*$}/**")
                .setViewName("forward:/index.html");
    }
}

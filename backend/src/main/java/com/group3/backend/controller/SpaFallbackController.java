package com.group3.backend.controller;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaFallbackController implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(PATH)
    public String error() {
        return "forward:/index.html";
    }

    public String getErrorPath() {
        return PATH;
    }
}

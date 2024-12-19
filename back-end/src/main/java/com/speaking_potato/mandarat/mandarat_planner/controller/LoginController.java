package com.speaking_potato.mandarat.mandarat_planner.controller;


import com.speaking_potato.mandarat.mandarat_planner.service.OAuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

    private final OAuthService oAuthService;

    public LoginController(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    @GetMapping("/login")
    public String login(@RequestParam String code) {

        String accessToken = oAuthService.requestAccessToken(code);
        String userInfo = oAuthService.getUserInfo(accessToken);

        return userInfo;
    }
}

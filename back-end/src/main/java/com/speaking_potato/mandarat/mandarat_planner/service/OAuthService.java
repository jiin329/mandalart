package com.speaking_potato.mandarat.mandarat_planner.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class OAuthService {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    private final WebClient authClient;
    private final WebClient apiClient;

    public OAuthService() {
        this.authClient = WebClient.builder()
                .baseUrl("https://kauth.kakao.com")
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
                .build();
        this.apiClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com")
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
                .build();
    }

    public String requestAccessToken(String code) {
        String tokenEndpoint = "/oauth/token";
        // POST 요청으로 액세스 토큰 가져오기
        Map response = authClient.post()
                .uri(tokenEndpoint)
                .body(BodyInserters.fromFormData("grant_type", "authorization_code")
                                .with("client_id", clientId)
                                .with("redirect_uri", redirectUri)
                                .with("code", code)
                )
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response != null && response.containsKey("access_token")) {
            return (String) response.get("access_token");
        }
        throw new RuntimeException("Failed to fetch access token");
    }


    // 액세스 토큰으로 사용자 정보 가져오기
    public String getUserInfo(String accessToken) {
        return apiClient.get()
                .uri("/v2/user/me")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .accept(MediaType.valueOf("application/x-www-form-urlencoded;charset=UTF-8"))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}

package com.speaking_potato.mandarat.mandarat_planner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication(scanBasePackages = "com.speaking_potato.mandarat.mandarat_planner")
public class MandalartPlannerApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MandalartPlannerApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(MandalartPlannerApplication.class, args);
	}
}

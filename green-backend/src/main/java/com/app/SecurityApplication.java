package com.app;

import com.app.request.RegisterRequest;
import com.app.service.AuthenticationService;

import static com.app.model.user.Role.MANAGER;
import static com.app.model.user.Role.TECHNICIAN;
import static com.app.model.user.Role.USER;
import static com.app.model.user.Role.CASHIER;
import static com.app.model.user.Role.STOREKEEPER;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service) {
		return args -> {

			// var manager = RegisterRequest.builder()
			// 		.firstname("Manager")
			// 		.lastname("Manager")
			// 		.email("manager@mail.com")
			// 		.password("password")
			// 		.role(MANAGER)
			// 		.build();
			// System.out.println("Manager token: " + service.register(manager).getAccessToken());

			// var technician = RegisterRequest.builder()
			// 		.firstname("Technician")
			// 		.lastname("Technician")
			// 		.email("technician@mail.com")
			// 		.password("password")
			// 		.role(TECHNICIAN)
			// 		.build();
			// System.out.println("Technician token: " + service.register(technician).getAccessToken());

			// var cashier = RegisterRequest.builder()
			// 		.firstname("Cashier")
			// 		.lastname("Cashier")
			// 		.email("cashier@mail.com")
			// 		.password("password")
			// 		.role(CASHIER)
			// 		.build();
			// System.out.println("Cashier token: " + service.register(cashier).getAccessToken());

			// var storekeeper = RegisterRequest.builder()
			// 		.firstname("Storekeeper")
			// 		.lastname("Storekeeper")
			// 		.email("storekeeper@mail.com")
			// 		.password("password")
			// 		.role(STOREKEEPER)
			// 		.build();
			// System.out.println("Storekeeper token: " + service.register(storekeeper).getAccessToken());

		};
	}
}

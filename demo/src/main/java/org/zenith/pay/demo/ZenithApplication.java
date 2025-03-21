package org.zenith.pay.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})

public class ZenithApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZenithApplication.class, args);
	}

}

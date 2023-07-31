package Project.comu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ComuApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComuApplication.class, args);
	}

}

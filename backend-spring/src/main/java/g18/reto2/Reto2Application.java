package g18.reto2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import g18.reto2.interfaces.InterfaceProduct;
import g18.reto2.interfaces.InterfaceUser;

@Component
@SpringBootApplication
public class Reto2Application implements CommandLineRunner {

	@Autowired
	private InterfaceProduct interfaceProduct;
	@Autowired
	private InterfaceUser interfaceUser;
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(Reto2Application.class, args);
	}

	public void run(String...args) throws Exception {
		interfaceProduct.deleteAll();
		interfaceUser.deleteAll();
	}

}


package g18.reto2.interfaces;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import g18.reto2.modelo.ModeloUser;

public interface InterfaceUser extends MongoRepository <ModeloUser, Integer> {
    Optional<ModeloUser> findByEmail(String email);
    Optional<ModeloUser> findByEmailAndPassword(String email,String password);
}

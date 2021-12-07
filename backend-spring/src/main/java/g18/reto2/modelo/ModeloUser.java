package g18.reto2.modelo;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeloUser {
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private String id;
    private String identification;
    private String name;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type;
}
package g18.reto2.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import g18.reto2.modelo.ModeloUser;
import g18.reto2.servicios.ServiciosUser;
/**
 * 
 * @author 
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class ControladorUser {
    /**
     * 
     */
    @Autowired
    private ServiciosUser UserService;
    /**
     * 
     * @return 
     */
    @GetMapping("/all")
    public List<ModeloUser> getAll() {
        return UserService.getAll();
    }
    /**
     * 
     * @param user
     * @return 
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public ModeloUser create(@RequestBody ModeloUser user) {
        return UserService.create(user);
    }
    /**
     * 
     * @param user
     * @return 
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public ModeloUser update(@RequestBody ModeloUser user) {
        return UserService.update(user);
    }
    /**
     * 
     * @param id
     * @return 
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete (@PathVariable("id") Integer id) {
        return UserService.delete(id);
    }
    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    @GetMapping("/{email}/{password}")
    public ModeloUser authenticateUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return UserService.authenticateUser(email, password);
    }
    /**
     * 
     * @param email
     * @return 
     */
    @GetMapping("/emailexist/{email}")
    public boolean emailExists(@PathVariable("email") String email) {
        return UserService.emailExists(email);
    }
}
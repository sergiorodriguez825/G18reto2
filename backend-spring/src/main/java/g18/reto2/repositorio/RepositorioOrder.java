package g18.reto2.repositorio;

import g18.reto2.interfaces.InterfaceOrder;
import g18.reto2.modelo.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author 
 */
@Repository
public class RepositorioOrder {
    @Autowired
    private InterfaceOrder orderCrudRepository;
    
    //@Autowired
    //private MongoTemplate mongoTemplate;

    public List<Order> getAll() {
        return (List<Order>) orderCrudRepository.findAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderCrudRepository.findById(id);
    }

    public Order create(Order order) {
        return orderCrudRepository.save(order);
    }

    public void update(Order order) {
        orderCrudRepository.save(order);
    }

    public void delete(Order order) {
        orderCrudRepository.delete(order);
    }
    
    public List<Order> findByZone(String zona){
       return orderCrudRepository.findByZone(zona);
    }
    
    
    public Optional<Order> lastUserId(){
        return orderCrudRepository.findTopByOrderByIdDesc();
    }
}

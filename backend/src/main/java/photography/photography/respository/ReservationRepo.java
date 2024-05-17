package photography.photography.respository;

import org.springframework.data.mongodb.repository.MongoRepository;

import photography.photography.model.Reservation;

public interface ReservationRepo extends MongoRepository<Reservation, String>{
    
}

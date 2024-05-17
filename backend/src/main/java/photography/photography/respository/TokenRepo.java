package photography.photography.respository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import photography.photography.model.Token;

public interface TokenRepo  extends MongoRepository<Token,String>{
    public Optional<Token> findById(String token);
}

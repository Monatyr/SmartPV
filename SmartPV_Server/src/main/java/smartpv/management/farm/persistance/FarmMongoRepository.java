package smartpv.management.farm.persistance;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FarmMongoRepository extends MongoRepository<FarmEntity, String> {

  Optional<FarmEntity> getById(String id);
}

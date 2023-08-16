package smartpv.management.farm;

import org.springframework.data.mongodb.repository.MongoRepository;
import smartpv.management.farm.persistance.FarmEntity;

public interface FarmRepository extends MongoRepository<FarmEntity, String> {

}

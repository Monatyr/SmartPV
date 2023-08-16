package smartpv.consumption.persistence.record;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsumptionMongoRepository extends
    MongoRepository<ConsumptionEntity, String> {

}

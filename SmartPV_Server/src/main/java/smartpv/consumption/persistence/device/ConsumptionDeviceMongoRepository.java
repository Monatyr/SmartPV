package smartpv.consumption.persistence.device;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsumptionDeviceMongoRepository extends
    MongoRepository<ConsumptionDeviceEntity, String> {

  List<ConsumptionDeviceEntity> findAllByFarmId(String farmId);

  Optional<ConsumptionDeviceEntity> findById(String id);

  List<ConsumptionDeviceEntity> findAllByFarmIdAndIdIsIn(String farmId, List<String> ids);
}

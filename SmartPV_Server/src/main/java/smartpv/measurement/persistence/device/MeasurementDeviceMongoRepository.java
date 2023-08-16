package smartpv.measurement.persistence.device;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeasurementDeviceMongoRepository extends
    MongoRepository<MeasurementDeviceEntity, String> {

  List<MeasurementDeviceEntity> findAll();

  List<MeasurementDeviceEntity> findAllByFarmId(String farmId);

  Optional<MeasurementDeviceEntity> getFirstById(String id);
}

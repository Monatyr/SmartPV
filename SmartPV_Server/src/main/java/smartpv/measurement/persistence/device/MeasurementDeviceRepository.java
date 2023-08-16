package smartpv.measurement.persistence.device;

import java.util.List;
import java.util.Optional;

public interface MeasurementDeviceRepository {

  List<MeasurementDeviceEntity> findAll();

  List<MeasurementDeviceEntity> findAllByFarmId(String farmId);

  Optional<MeasurementDeviceEntity> getFirstById(String id);

  void save(MeasurementDeviceEntity measurementDeviceEntity);

  void saveMeasurementStatistics(String measurementDeviceEntityId, Long measured);
}

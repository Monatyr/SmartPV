package smartpv.consumption.persistence.device;

import java.util.List;
import java.util.Optional;
import smartpv.consumption.ControlParameters;
import smartpv.management.farm.persistance.FarmEntity;

public interface ConsumptionDeviceRepository {

  Optional<ConsumptionDeviceEntity> findById(String id);

  void saveAll(List<ConsumptionDeviceEntity> devices);

  List<ConsumptionDeviceEntity> findAllByFarmId(String farmId);

  List<ConsumptionDeviceEntity> findAll();

  Optional<Boolean> isDeviceOn(String id);

  void setDeviceOn(String id, boolean newStatus);

  void setDeviceParameters(String id,
      ControlParameters controlParameters);

  Optional<ControlParameters> getDeviceParameters(
      String id);

  Optional<ConsumptionDeviceEntity> findHighestPriorityOffDevice(FarmEntity farm);

  Optional<ConsumptionDeviceEntity> findLowestPriorityOnDevice(FarmEntity farm);

  List<ConsumptionDeviceEntity> findAllByFarmIdAndIdIsIn(String farmId, List<String> ids);

  void saveConsumptionStatistic(String deviceId, Long duration);
}

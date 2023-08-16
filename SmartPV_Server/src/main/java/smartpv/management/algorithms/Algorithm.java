package smartpv.management.algorithms;

import java.util.List;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.measurement.persistence.record.MeasurementEntity;

public interface Algorithm {

  List<ConsumptionDeviceEntity> updateDevicesStatus(MeasurementEntity measuredEnergy,
      List<ConsumptionDeviceEntity> devices,
      FarmEntity farm);
}

package smartpv.management.algorithms;

import java.util.List;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.measurement.persistence.record.MeasurementEntity;

public class KnapsackAlgorithm implements Algorithm {

  @Override
  public List<ConsumptionDeviceEntity> updateDevicesStatus(MeasurementEntity measuredEnergy,
      List<ConsumptionDeviceEntity> devices,
      FarmEntity farm) {

    Float availableEnergy =
        measuredEnergy.getMeasurement() + (float) devices.stream().filter(ConsumptionDeviceEntity::getIsOn)
            .mapToDouble((device) -> device.getControlParameters().powerConsumption()).sum();
    //TODO
    return devices;
  }
}

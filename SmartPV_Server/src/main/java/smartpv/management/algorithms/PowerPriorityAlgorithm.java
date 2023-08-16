package smartpv.management.algorithms;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.measurement.persistence.record.MeasurementEntity;
import smartpv.server.utils.DateTimeUtils;

public class PowerPriorityAlgorithm implements Algorithm {

  @Override
  public List<ConsumptionDeviceEntity> updateDevicesStatus(MeasurementEntity measuredEnergy,
      List<ConsumptionDeviceEntity> devices, FarmEntity farm) {
    Optional<ConsumptionDeviceEntity> deviceToChange;

    Float measurement = measuredEnergy.getMeasurement();
    if (measurement > farm.energyLimit()) {
      deviceToChange = devices.stream()
          .filter((device) -> !device.getControlParameters().lock().isLocked())
          .filter((device) -> !device.getIsOn())
          .max(Comparator.comparing((e) -> e.getControlParameters().priority()))
          .filter((device) -> device.getControlParameters().lastStatusChange()
              .before(DateTimeUtils.subtractMinutes(measuredEnergy.getDate(), farm.minutesBetweenDeviceStatusSwitch())))
          .map((device) -> {
            if (measurement > farm.energyLimit() + device.getControlParameters().powerConsumption()) {
              device.setControlParameters(device.getControlParameters().withLastStatusChange(measuredEnergy.getDate()));
              device.setIsOn(true);
            }
            return device;
          });
    } else {
      deviceToChange = devices.stream()
          .filter((device) -> !device.getControlParameters().lock().isLocked())
          .filter(ConsumptionDeviceEntity::getIsOn)
          .min(Comparator.comparing((e) -> e.getControlParameters().priority()))
          .filter((device) -> device.getControlParameters().lastStatusChange()
              .before(DateTimeUtils.subtractMinutes(measuredEnergy.getDate(), farm.minutesBetweenDeviceStatusSwitch())))
          .map((device) -> {
            device.setIsOn(false);
            device.setControlParameters(device.getControlParameters().withLastStatusChange(measuredEnergy.getDate()));
            return device;
          });
    }
    deviceToChange.ifPresent(
        (deviceToChangePresent) -> devices.set(
            devices
                .stream()
                .filter((device) -> device.getId().equals(deviceToChangePresent.getId()))
                .findFirst()
                .map((devices::indexOf))
                .orElse(0),
            deviceToChangePresent
        )
    );
    return devices;
  }
}

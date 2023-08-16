package smartpv.management.farm;

import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smartpv.consumption.ConsumptionService;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.management.ManagementService;
import smartpv.measurement.MeasurementService;
import smartpv.measurement.persistence.record.MeasurementEntity;

@Service
public class FarmService {

  private final ManagementService managementService;
  private final MeasurementService measurementService;
  private final ConsumptionService consumptionService;
  private final FarmRepository farmRepository;

  @Autowired
  public FarmService(ManagementService managementService, FarmRepository farmRepository,
      MeasurementService measurementService, ConsumptionService consumptionService) {
    this.managementService = managementService;
    this.measurementService = measurementService;
    this.farmRepository = farmRepository;
    this.consumptionService = consumptionService;
  }

  public String makeAllFarmsDevicesUpdate() {
    return String.join("\n",
        farmRepository.findAll().stream()
            .map(managementService::updateDevices)
            .flatMap(Collection::stream)
            .map((device) -> "(%s,%s)".formatted(device.getId(), device.getIsOn()))
            .toList());
  }

  public String makeAllFarmsDevicesMeasurement() {
    return String.valueOf(
        farmRepository.findAll().stream()
            .map(measurementService::makeAndSaveMeasurement)
            .mapToDouble(MeasurementEntity::getMeasurement)
            .sum());
  }

  public String collectAllFarmsDevicesStatus() {
    return String.valueOf(
        farmRepository.findAll().stream()
            .map(consumptionService::collectAndSaveDevicesStatus)
            .map(ConsumptionEntity::getActiveDevicesIds)
            .mapToLong(List::size)
            .sum());
  }
}
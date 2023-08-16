package smartpv.management;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smartpv.consumption.ConsumptionService;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.consumption.persistence.device.ConsumptionDeviceRepository;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.consumption.persistence.record.ConsumptionRepository;
import smartpv.management.algorithms.Counter;
import smartpv.management.algorithms.StringToAlgorithm;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.measurement.MeasurementService;
import smartpv.measurement.persistence.record.MeasurementEntity;
import smartpv.measurement.persistence.record.MeasurementRepository;
import smartpv.server.utils.DateTimeUtils;

@Service
public class ManagementService {

  private final ConsumptionDeviceRepository consumptionDeviceRepository;
  private final ConsumptionRepository consumptionRepository;
  private final MeasurementService measurementService;
  private final ConsumptionService consumptionService;
  private final Counter counter;
  private final MeasurementRepository measurementRepository;

  @Autowired
  public ManagementService(ConsumptionDeviceRepository consumptionDeviceRepository,
      ConsumptionRepository consumptionRepository, MeasurementService measurementService,
      ConsumptionService consumptionService, Counter counter, MeasurementRepository measurementRepository) {
    this.consumptionDeviceRepository = consumptionDeviceRepository;
    this.consumptionRepository = consumptionRepository;
    this.measurementService = measurementService;
    this.consumptionService = consumptionService;
    this.counter = counter;
    this.measurementRepository = measurementRepository;
  }

  public List<ConsumptionDeviceEntity> updateDevices(FarmEntity farm) {
    ConsumptionEntity consumptionEntity = consumptionService.collectDevicesStatus(farm);
    List<ConsumptionDeviceEntity> activeDevicesRequestResponse = consumptionDeviceRepository
        .findAllByFarmIdAndIdIsIn(farm.id(), consumptionEntity.getActiveDevicesIds());

    List<ConsumptionDeviceEntity> allDevices = consumptionDeviceRepository.findAllByFarmId(farm.id());
    List<ConsumptionDeviceEntity> allDevicesWithUpdatedLock = updateDevicesLock(activeDevicesRequestResponse,
        allDevices);
    List<MeasurementEntity> measurementEntitiesToAverage = measurementRepository.findAllByFarmIdAndDateIsBetween(
        farm.id(), DateTimeUtils.subtractMinutes(consumptionEntity.getDate(), farm.minutesToAverageMeasurement()),
        DateTimeUtils.addMinutes(consumptionEntity.getDate(), 1));
    if (measurementEntitiesToAverage.size() == 0) {
      return allDevicesWithUpdatedLock;
    }
    MeasurementEntity measuredEnergy = new MeasurementEntity(
        farm.id(),
        getAverageMeasurement(measurementEntitiesToAverage).floatValue(),
        Map.of(),
        consumptionEntity.getDate());
    List<ConsumptionDeviceEntity> allDevicesWithUpdatedLockAndStatus = StringToAlgorithm.stringToAlgorithm(
            farm.algorithmType())
        .updateDevicesStatus(
            measuredEnergy,
            allDevicesWithUpdatedLock,
            farm);

    List<ConsumptionDeviceEntity> updatedDevices = allDevicesWithUpdatedLockAndStatus.stream()
        .filter((device) -> {
          boolean isActive = activeDevicesRequestResponse.stream().map(ConsumptionDeviceEntity::getId).toList()
              .contains(device.getId());
          return device.getIsOn() && !isActive
              || !device.getIsOn() && isActive;
        }).toList();
    consumptionDeviceRepository.saveAll(allDevicesWithUpdatedLockAndStatus);
    updatedDevices.forEach((device) -> consumptionService.turnDeviceRequest(device, device.getIsOn()));

    return updatedDevices;
  }

  private List<ConsumptionDeviceEntity> updateDevicesLock(List<ConsumptionDeviceEntity> activeDevices,
      List<ConsumptionDeviceEntity> allDevices) {
    allDevices.forEach((device) -> {
      boolean isDeviceOnRequestResponse = activeDevices.contains(device);
      if (!device.getControlParameters().lock().isLocked()) {
        if ((device.getIsOn() && !isDeviceOnRequestResponse)
            || (!device.getIsOn() && isDeviceOnRequestResponse)) {
          device.setControlParameters(device.getControlParameters().withLock(true));
        }
      } else {
        if (device.getControlParameters().lock().date().after(DateTimeUtils.getNow())) {
          device.setControlParameters(device.getControlParameters().withLock(false));
        }
      }
      device.setIsOn(isDeviceOnRequestResponse);
    });
    return allDevices;
  }

  private Double getAverageMeasurement(List<MeasurementEntity> measurementEntitiesToAverage) {
    return counter.countAverage(
        measurementEntitiesToAverage
            .stream()
            .mapToDouble(MeasurementEntity::getMeasurement)
            .boxed()
            .toList()
    );
  }
}

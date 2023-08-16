package smartpv.consumption;

import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;
import smartpv.consumption.dto.ConsumptionResponseMapper;
import smartpv.consumption.dto.ConsumptionTurnOnOffResponseMapper;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.consumption.persistence.device.ConsumptionDeviceRepository;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.consumption.persistence.record.ConsumptionRepository;
import smartpv.management.device.DeviceRequester;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.server.utils.Action;

@Service
public class ConsumptionService {

  private final ConsumptionRepository consumptionRepository;
  private final ConsumptionDeviceRepository consumptionDeviceRepository;
  private final DeviceRequester deviceRequester;

  private final ConsumptionStatisticsService consumptionStatisticsService;

  public ConsumptionService(ConsumptionRepository consumptionRepository,
      ConsumptionDeviceRepository consumptionDeviceRepository, DeviceRequester deviceRequester,
      ConsumptionStatisticsService consumptionStatisticsService) {
    this.consumptionRepository = consumptionRepository;
    this.consumptionDeviceRepository = consumptionDeviceRepository;
    this.deviceRequester = deviceRequester;
    this.consumptionStatisticsService = consumptionStatisticsService;
  }

  public ConsumptionTurnOnOffResponseMapper turnDeviceRequest(
      ConsumptionDeviceEntity consumptionDeviceEntity, Boolean status) {
    try {
      return deviceRequester.request(consumptionDeviceEntity,
          status ? Action.TURN_ON : Action.TURN_OFF).toMapper(consumptionDeviceEntity.getId());
    } catch (ClassNotFoundException e) {
      throw new RuntimeException(e);
    }
  }

  public ConsumptionEntity collectAndSaveDevicesStatus(FarmEntity farm) {
    ConsumptionEntity consumptionEntity = collectDevicesStatus(farm);
    consumptionStatisticsService.updateConsumptionStatistics(consumptionEntity);
    consumptionRepository.save(consumptionEntity);
    return consumptionEntity;
  }

  public ConsumptionEntity collectDevicesStatus(FarmEntity farm) {
    List<String> activeDevices = consumptionDeviceRepository
        .findAllByFarmId(farm.id())
        .stream()
        .map(this::requestDevicesStatus)
        .filter(ConsumptionResponseMapper::isOn)
        .map(ConsumptionResponseMapper::deviceId)
        .toList();

    return new ConsumptionEntity(activeDevices, activeDevices.size(), new Date(), farm.id());
  }


  private ConsumptionResponseMapper requestDevicesStatus(
      ConsumptionDeviceEntity consumptionDeviceEntity) {
    try {
      return deviceRequester.request(
          consumptionDeviceEntity, Action.READ).toMapper(consumptionDeviceEntity.getId());
    } catch (ClassNotFoundException e) {
      throw new RuntimeException(e);
    }
  }

}

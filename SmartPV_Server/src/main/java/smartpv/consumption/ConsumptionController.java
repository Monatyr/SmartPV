package smartpv.consumption;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import smartpv.consumption.dto.ConsumptionIsOnDto;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;
import smartpv.consumption.persistence.device.ConsumptionDeviceRepository;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.consumption.persistence.record.ConsumptionRepository;
import smartpv.management.device.Device;
import smartpv.server.conf.Routing;
import smartpv.server.conf.Routing.Consumption.Devices;


@RestController
class ConsumptionController {

  private final ConsumptionDeviceRepository consumptionDeviceRepository;
  private final ConsumptionRepository consumptionRepository;

  @Autowired
  ConsumptionController(ConsumptionDeviceRepository consumptionDeviceRepository,
      ConsumptionRepository consumptionRepository) {
    this.consumptionDeviceRepository = consumptionDeviceRepository;
    this.consumptionRepository = consumptionRepository;
  }

  @GetMapping(Devices.PATH)
  List<String> getDevices() {
    return consumptionDeviceRepository
        .findAll()
        .stream()
        .map(Device::getId)
        .toList();
  }

  @GetMapping(Routing.Consumption.Devices.DeviceId.PATH)
  ResponseEntity<ConsumptionDeviceEntity> getDevice(
      @PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId) {
    return consumptionDeviceRepository
        .findById(deviceId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(Routing.Consumption.Devices.DeviceId.Parameters.PATH)
  ResponseEntity<ControlParameters> getDeviceParameters(
      @PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId) {
    return consumptionDeviceRepository
        .getDeviceParameters(deviceId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping(Routing.Consumption.Devices.DeviceId.Parameters.PATH)
  void setDeviceParameters(@PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId,
      @RequestBody ControlParameters controlParameters) {
    consumptionDeviceRepository.setDeviceParameters(deviceId, controlParameters);
  }

  @GetMapping(Routing.Consumption.Devices.DeviceId.Parameters.IsOn.PATH)
  ResponseEntity<Boolean> getDeviceParametersIsOn(
      @PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId) {
    return consumptionDeviceRepository
        .isDeviceOn(deviceId).map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping(Routing.Consumption.Devices.DeviceId.Parameters.IsOn.PATH)
  void postDeviceParametersIsOn(@PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId,
      @RequestBody ConsumptionIsOnDto consumptionIsOnDto) {
    consumptionDeviceRepository.setDeviceOn(deviceId, consumptionIsOnDto.isOn());
  }

  @GetMapping(Routing.Consumption.Devices.DeviceId.Last.PATH)
  ResponseEntity<Date> getLastDeviceActiveStatus(@PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId) {
    return consumptionRepository
        .findLast(consumptionDeviceRepository.findById(deviceId).map(Device::getFarmId).get())
        .map(ConsumptionEntity::getDate)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(Routing.Consumption.Devices.DeviceId.Statistics.Sum.PATH)
  ResponseEntity<Long> getDeviceStatisticsSum(@PathVariable(Routing.DEVICE_ID_VARIABLE) String deviceId) {
    return consumptionDeviceRepository
        .findById(deviceId).map(ConsumptionDeviceEntity::getWorkingHours)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(Routing.Consumption.Farms.FarmId.Statistics.Sum.PATH)
  ResponseEntity<Long> getFarmStatisticsSum(@PathVariable(Routing.FARM_ID_VARIABLE) String farmId) {
    return ResponseEntity.ok(consumptionDeviceRepository
        .findAllByFarmId(farmId)
        .stream()
        .mapToLong(ConsumptionDeviceEntity::getWorkingHours)
        .sum());
  }
}

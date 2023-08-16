package smartpv.consumption.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import smartpv.consumption.persistence.device.ConsumptionDeviceEntity;

public record ConsumptionIsOnDto(boolean isOn) {

  public ConsumptionIsOnDto(@JsonProperty("isOn") boolean isOn) {
    this.isOn = isOn;
  }

  public static ConsumptionIsOnDto ofConsumerDeviceEntity(
      ConsumptionDeviceEntity consumptionDeviceEntity) {
    return new ConsumptionIsOnDto(consumptionDeviceEntity.getIsOn());
  }
}

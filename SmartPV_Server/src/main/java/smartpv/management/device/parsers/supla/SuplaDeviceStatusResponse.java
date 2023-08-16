package smartpv.management.device.parsers.supla;

import smartpv.consumption.dto.ConsumptionResponseMapper;
import smartpv.management.device.parsers.Response;

public record SuplaDeviceStatusResponse(Boolean connected, Boolean on,
                                        Boolean currentOverload) implements Response {

  @Override
  public ConsumptionResponseMapper toMapper(String deviceId) {
    return new ConsumptionResponseMapper(connected && on, deviceId);
  }
}
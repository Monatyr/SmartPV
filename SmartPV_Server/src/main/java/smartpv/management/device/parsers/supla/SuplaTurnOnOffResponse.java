package smartpv.management.device.parsers.supla;

import smartpv.consumption.dto.ConsumptionTurnOnOffResponseMapper;
import smartpv.management.device.parsers.Response;

public record SuplaTurnOnOffResponse(Boolean success) implements Response {

  @Override
  public ConsumptionTurnOnOffResponseMapper toMapper(String deviceId) {
    return new ConsumptionTurnOnOffResponseMapper(deviceId, success);
  }
}

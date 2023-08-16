package smartpv.management.device.parsers.supla;

import java.util.Currency;
import java.util.List;
import smartpv.management.device.parsers.Response;
import smartpv.measurement.MeasurementResponseMapper;

public record SuplaElectricMeterResponse(boolean connected, Float support, Currency currency,
                                         Float pricePerUnit, Float totalCost,
                                         List<PhaseResponse> phases) implements Response {

  @Override
  public MeasurementResponseMapper toMapper(String deviceId) {
    return new MeasurementResponseMapper(connected, support, currency, pricePerUnit, totalCost,
        phases, deviceId);
  }
}

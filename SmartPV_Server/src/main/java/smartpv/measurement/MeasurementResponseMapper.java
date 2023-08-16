package smartpv.measurement;

import java.util.Currency;
import java.util.List;
import smartpv.management.device.parsers.supla.PhaseResponse;

public record MeasurementResponseMapper(boolean connected, Float support, Currency currency,
                                        Float pricePerUnit, Float totalCost,
                                        List<PhaseResponse> phases, String deviceId) {


  public Float getMeasurementSum() {
    return (float) -phases.stream().mapToDouble(PhaseResponse::powerActive).sum();
  }
}
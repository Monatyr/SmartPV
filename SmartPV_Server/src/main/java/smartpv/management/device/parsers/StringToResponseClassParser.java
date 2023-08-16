package smartpv.management.device.parsers;

import org.springframework.stereotype.Component;
import smartpv.management.device.parsers.supla.SuplaDeviceStatusResponse;
import smartpv.management.device.parsers.supla.SuplaElectricMeterResponse;
import smartpv.management.device.parsers.supla.SuplaTurnOnOffResponse;

@Component
public class StringToResponseClassParser {

  public Class<?> stringToResponseClass(ResponseType responseType) {
    return switch (responseType) {
      case SUPLA_ELECTRIC_METER -> SuplaElectricMeterResponse.class;
      case SUPLA_SWITCH -> SuplaTurnOnOffResponse.class;
      case SUPLA_STATUS -> SuplaDeviceStatusResponse.class;
    };
  }

}

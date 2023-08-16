package smartpv.management.device.parsers;

import java.io.Serializable;

public interface Response extends Serializable {

  <T> T toMapper(String deviceId);
}

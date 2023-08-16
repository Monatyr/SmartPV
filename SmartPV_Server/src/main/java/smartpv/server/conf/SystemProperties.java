package smartpv.server.conf;

import java.time.Period;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("system")
@ConstructorBinding
@Data
public class SystemProperties {

  private Boolean measure;
  private Boolean collectDevicesStatus;
  private Boolean manageDevices;
  private Management management;

  public SystemProperties(Boolean measure, Boolean collectDevicesStatus, Boolean manageDevices,
      Management management) {
    this.measure = measure;
    this.collectDevicesStatus = collectDevicesStatus;
    this.manageDevices = manageDevices;
    this.management = management;
  }

  @Data

  public static class Management {

    private Period lockPeriod;

    public Management(Period lockPeriod) {
      this.lockPeriod = lockPeriod;
    }
  }
}


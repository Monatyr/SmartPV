package smartpv.consumption.persistence.device;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import smartpv.consumption.ControlParameters;
import smartpv.management.device.Device;
import smartpv.server.utils.HttpEndpointData;

@Getter
@Setter
@Document(collection = "consumptionDeviceEntity")
public class ConsumptionDeviceEntity extends Device {

  private Boolean isOn;
  private ControlParameters controlParameters;
  private Long workingHours;

  public ConsumptionDeviceEntity(String id, String farmId, String name, String ipAddress,
      List<HttpEndpointData> endpoints, Boolean isOn, ControlParameters controlParameters, Long workingHours) {
    super(id, farmId, name, ipAddress, endpoints);
    this.isOn = isOn;
    this.controlParameters = controlParameters;
    this.workingHours = workingHours;
  }

  public ConsumptionDeviceEntity withWorkingHours(Long workingHours) {
    return new ConsumptionDeviceEntity(getId(), getFarmId(), getName(), getIpAddress(), getEndpoints(), getIsOn(),
        getControlParameters(), workingHours);
  }
}


package smartpv.measurement.persistence.device;

import java.util.List;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import smartpv.management.device.Device;
import smartpv.server.utils.HttpEndpointData;

@Document()
@Getter
public class MeasurementDeviceEntity extends Device {

  private final Long measuredEnergy;

  public MeasurementDeviceEntity(String id, String farmId, String name, String ipAddress,
      List<HttpEndpointData> endpoints, Long measuredEnergy) {
    super(id, farmId, name, ipAddress, endpoints);
    this.measuredEnergy = measuredEnergy;
  }

  public MeasurementDeviceEntity withMeasuredEnergy(Long measuredEnergy) {
    return new MeasurementDeviceEntity(getId(), getFarmId(), getName(), getIpAddress(), getEndpoints(), measuredEnergy);
  }
}

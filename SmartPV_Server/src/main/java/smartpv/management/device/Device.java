package smartpv.management.device;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import smartpv.server.utils.HttpEndpointData;

@Data
@AllArgsConstructor
public class Device {

  @Id
  private String id;
  private String farmId;
  private String name;
  private String ipAddress;
  private List<HttpEndpointData> endpoints;
}

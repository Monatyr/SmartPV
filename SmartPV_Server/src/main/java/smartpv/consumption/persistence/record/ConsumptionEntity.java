package smartpv.consumption.persistence.record;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "consumptionEntity")
@AllArgsConstructor
@NoArgsConstructor
public class ConsumptionEntity {

  private List<String> activeDevicesIds;
  private Integer activeDevicesNum;
  private Date date;
  private String farmId;

  @Id
  private ObjectId id;

  @PersistenceCreator
  public ConsumptionEntity(List<String> activeDevicesIds, Integer activeDevicesNum, Date date, String farmId) {
    this.activeDevicesIds = activeDevicesIds;
    this.activeDevicesNum = activeDevicesNum;
    this.date = date;
    this.farmId = farmId;
  }

  public ConsumptionEntity withDate(Date date) {
    return new ConsumptionEntity(this.activeDevicesIds, this.activeDevicesNum, date, this.farmId, this.id);
  }

  public ConsumptionEntity withActiveDevices(List<String> activeDevicesIds) {
    return new ConsumptionEntity(activeDevicesIds, activeDevicesIds.size(), this.date, this.farmId, this.id);
  }
}

package smartpv.measurement.persistence.record;

import java.util.Date;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Data
@Document(collection = "measurementEntity")
@NoArgsConstructor
public class MeasurementEntity {

  private String farmId;
  private Float measurement;
  private Map<String, Float> measurements;
  private Date date;
  @Id
  private ObjectId id;

  @PersistenceCreator
  public MeasurementEntity(String farmId, Float measurement, Map<String, Float> measurements, Date date) {
    this.farmId = farmId;
    this.measurement = measurement;
    this.measurements = measurements;
    this.date = date;
  }

  public MeasurementEntity withMeasurement(Float measurement) {
    return new MeasurementEntity(farmId, measurement, measurements, date, id);
  }
}

package smartpv.measurement;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import smartpv.measurement.persistence.record.MeasurementEntity;

public class MeasurementMapper {

  public Float measurement;
  public Date date;

  public MeasurementMapper(
      Float measurement,
      @JsonFormat(shape = JsonFormat.Shape.STRING)
      @JsonProperty("date") Date date
  ) {
    this.measurement = measurement;
    this.date = date;
  }

  public static MeasurementMapper ofMeasurementEntity(MeasurementEntity measurementEntity) {
    return new MeasurementMapper(measurementEntity.getMeasurement(), measurementEntity.getDate());
  }


}

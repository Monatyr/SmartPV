package smartpv.measurement;

import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smartpv.management.algorithms.Counter;
import smartpv.measurement.persistence.device.MeasurementDeviceRepository;
import smartpv.measurement.persistence.record.MeasurementEntity;
import smartpv.measurement.persistence.record.MeasurementRepository;

@Service
public class MeasurementStatisticsService {

  private final MeasurementDeviceRepository measurementDeviceRepository;
  private final MeasurementRepository measurementRepository;
  private final Counter counter;

  @Autowired
  public MeasurementStatisticsService(MeasurementDeviceRepository measurementDeviceRepository,
      MeasurementRepository measurementRepository, Counter counter) {
    this.measurementDeviceRepository = measurementDeviceRepository;
    this.measurementRepository = measurementRepository;
    this.counter = counter;
  }

  public void updateMeasurementStatistics(MeasurementEntity measurementEntity) {
    MeasurementEntity recentMeasurement = measurementRepository
        .findTopByDate().get();

    measurementEntity.getMeasurements().forEach((deviceId, measurement) -> {
      Map<Date, Double> measurements = Map.of(
          recentMeasurement.getDate(), recentMeasurement.getMeasurements().get(deviceId).doubleValue(),
          measurementEntity.getDate(), measurement.doubleValue()
      );
      Double difference = counter.countSimpson(measurements);
      measurementDeviceRepository.saveMeasurementStatistics(deviceId, difference.longValue());
    });
  }
}

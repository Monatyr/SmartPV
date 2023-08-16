package smartpv.measurement;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smartpv.management.device.DeviceRequester;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.measurement.persistence.device.MeasurementDeviceEntity;
import smartpv.measurement.persistence.device.MeasurementDeviceRepository;
import smartpv.measurement.persistence.record.MeasurementEntity;
import smartpv.measurement.persistence.record.MeasurementRepository;
import smartpv.server.utils.Action;

@Service
public class MeasurementService {

  private final MeasurementDeviceRepository measurementDeviceRepository;
  private final MeasurementRepository measurementRepository;
  private final DeviceRequester deviceRequester;
  private final MeasurementStatisticsService measurementStatisticsService;

  @Autowired
  public MeasurementService(
      MeasurementDeviceRepository measurementDeviceRepository,
      DeviceRequester deviceRequester,
      MeasurementRepository measurementRepository, MeasurementStatisticsService measurementStatisticsService) {
    this.deviceRequester = deviceRequester;
    this.measurementDeviceRepository = measurementDeviceRepository;
    this.measurementRepository = measurementRepository;
    this.measurementStatisticsService = measurementStatisticsService;
  }

  public MeasurementEntity makeAndSaveMeasurement(FarmEntity farm) {
    MeasurementEntity measurementEntity = makeMeasurement(farm);
    measurementStatisticsService.updateMeasurementStatistics(measurementEntity);
    measurementRepository.save(measurementEntity);
    return measurementEntity;
  }

  public MeasurementEntity makeMeasurement(FarmEntity farm) {
    List<MeasurementResponseMapper> responses = measurementDeviceRepository
        .findAllByFarmId(farm.id())
        .stream()
        .map(this::requestMeasurement).toList();
    Float measurementSum = responses.stream()
        .map(MeasurementResponseMapper::getMeasurementSum)
        .reduce((float) 0, Float::sum);
    Map<String, Float> measurements = responses.stream()
        .collect(Collectors.toMap(
            MeasurementResponseMapper::deviceId,
            MeasurementResponseMapper::getMeasurementSum));

    return new MeasurementEntity(farm.id(), measurementSum,
        measurements, new Date());
  }


  private MeasurementResponseMapper requestMeasurement(
      MeasurementDeviceEntity measurementDeviceEntity) {
    try {
      return deviceRequester.request(measurementDeviceEntity, Action.READ)
          .toMapper(measurementDeviceEntity.getId());
    } catch (ClassNotFoundException e) {
      throw new RuntimeException(e);
    }
  }

}

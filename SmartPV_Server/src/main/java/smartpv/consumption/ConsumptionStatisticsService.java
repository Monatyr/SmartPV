package smartpv.consumption;


import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import smartpv.consumption.persistence.device.ConsumptionDeviceRepository;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.consumption.persistence.record.ConsumptionRepository;
import smartpv.management.algorithms.Counter;

@Service
@AllArgsConstructor
public class ConsumptionStatisticsService {

  private final ConsumptionRepository consumptionRepository;
  private final ConsumptionDeviceRepository consumptionDeviceRepository;
  private final Counter counter;

  public void updateConsumptionStatistics(ConsumptionEntity consumptionEntity) {
    ConsumptionEntity last = consumptionRepository.findLast(consumptionEntity.getFarmId()).get();
    consumptionEntity.getActiveDevicesIds().forEach((id) -> {
      if (last.getActiveDevicesIds().contains(id)) {
        Long diff = counter.countDuration(Map.of(
            last.getDate(), true,
            consumptionEntity.getDate(), true
        )).longValue();
        consumptionDeviceRepository.saveConsumptionStatistic(id, diff);
      }
    });
  }
}

package smartpv.consumption.persistence.record;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ConsumptionRepository {

  List<ConsumptionEntity> findAll();

  void save(ConsumptionEntity consumptionEntity);

  List<ConsumptionEntity> findRecentEntities(String farmId, Date from, Date to);

  Optional<ConsumptionEntity> findLast(String farmId);
}

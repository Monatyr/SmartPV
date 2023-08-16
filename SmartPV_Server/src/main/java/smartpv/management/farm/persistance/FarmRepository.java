package smartpv.management.farm.persistance;

import java.util.List;
import java.util.Optional;

public interface FarmRepository {

  Optional<FarmEntity> getById(String id);

  List<FarmEntity> findAll();
}

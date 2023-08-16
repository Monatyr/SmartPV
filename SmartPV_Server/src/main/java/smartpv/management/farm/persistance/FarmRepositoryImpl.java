package smartpv.management.farm.persistance;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class FarmRepositoryImpl implements FarmRepository {

  private final FarmMongoRepository farmMongoRepository;

  public FarmRepositoryImpl(FarmMongoRepository farmMongoRepository) {
    this.farmMongoRepository = farmMongoRepository;
  }

  @Override
  public Optional<FarmEntity> getById(String id) {
    return farmMongoRepository.getById(id);
  }

  @Override
  public List<FarmEntity> findAll() {
    return farmMongoRepository.findAll();
  }
}

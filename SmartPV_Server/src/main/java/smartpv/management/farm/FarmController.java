package smartpv.management.farm;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import smartpv.management.farm.persistance.FarmEntity;
import smartpv.management.farm.persistance.FarmRepository;
import smartpv.server.conf.Routing;

@RestController
public class FarmController {

  private final FarmRepository farmRepository;
  private final FarmService farmService;

  public FarmController(FarmRepository farmRepository, FarmService farmService) {
    this.farmRepository = farmRepository;
    this.farmService = farmService;
  }

  @GetMapping(Routing.Management.Farms.PATH)
  List<String> getFarms() {
    return farmRepository.findAll().stream().map(FarmEntity::id).toList();
  }

  @GetMapping(Routing.Management.Farms.FarmId.PATH)
  ResponseEntity<FarmEntity> getFarm(@PathVariable(Routing.FARM_ID_VARIABLE) String farmId) {
    return farmRepository
        .getById(farmId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(Routing.Management.Farms.FarmId.Parameters.Name.PATH)
  ResponseEntity<String> getFarmName(@PathVariable(Routing.FARM_ID_VARIABLE) String farmId) {
    return farmRepository
        .getById(farmId)
        .map(FarmEntity::name)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}

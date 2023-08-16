package smartpv.management.farm.persistance;

import nonapi.io.github.classgraph.json.Id;
import smartpv.management.algorithms.AlgorithmType;

public record FarmEntity(@Id String id, String name, String description, AlgorithmType algorithmType,
                         Float energyLimit, Integer minutesBetweenDeviceStatusSwitch,
                         Integer minutesToAverageMeasurement) {

}

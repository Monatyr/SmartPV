package smartpv.management.device.parsers.supla;

public record PhaseResponse(Integer number, Integer frequency, Float voltage, Float current,
                            Float powerActive, Float powerReactive, Float powerApparent,
                            Float powerFactor, Float phaseAngle, Float totalForwardActiveEnergy,
                            Float totalReverseActiveEnergy, Float totalForwardReactiveEnergy,
                            Float totalReverseReactiveEnergy) {

}

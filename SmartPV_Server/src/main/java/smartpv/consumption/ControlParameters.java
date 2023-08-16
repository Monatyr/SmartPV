package smartpv.consumption;

import java.util.Date;
import smartpv.server.utils.DateTimeUtils;

public record ControlParameters(Integer priority, Float powerConsumption, Integer minHysteresis,
                                Integer maxHysteresis, Lock lock, Date lastStatusChange) {

  public ControlParameters withLock(Boolean status) {
    return new ControlParameters(priority, powerConsumption, minHysteresis, maxHysteresis,
        new Lock(status, DateTimeUtils.endOfDay()), lastStatusChange);
  }

  public ControlParameters withLastStatusChange(Date lastStatusChange) {
    return new ControlParameters(priority, powerConsumption, minHysteresis, maxHysteresis, lock, lastStatusChange);
  }

  public record Lock(Boolean isLocked, Date date) {

  }
}

package smartpv.management.algorithms;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import smartpv.server.utils.DateTimeUtils;

@ActiveProfiles("test")
@SpringBootTest
@Slf4j
class CounterTest {

  @Autowired
  Counter counter;

  @Test
  void countAverage() {
    var data = List.of(1.5, 2., 3., 4., 5.);
    var result = counter.countAverage(data);
    var expected = 3.44;
    assertEquals(expected, result);
    assertEquals(1.5, counter.countAverage(List.of(1.5)));
  }

  @Test
  void countSimpson() {
    var data = Map.of(
        new Date(), 10.,
        DateTimeUtils.addMinutes(new Date(), 5), 20.20,
        DateTimeUtils.addMinutes(new Date(), 10), 20.5,
        DateTimeUtils.addMinutes(new Date(), 15), 20.5,

        DateTimeUtils.addMinutes(new Date(), 20), 20.5,
        DateTimeUtils.addMinutes(new Date(), 60), 20.5);
    var expected = 20.11;
    var result = counter.countSimpson(data);
    assertEquals(expected, result);
  }
}
package smartpv.server.utils;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import org.apache.commons.lang3.time.DateUtils;

public class DateTimeUtils {

  public static final ZoneId WARSAW_ZONE_ID = ZoneId.of("Europe/Warsaw");
  public static final ZoneId REFERENCE_ZONE_ID = ZoneId.of("Z");

  private DateTimeUtils() {
  }

  public static LocalDateTime dateToLocalDateTime(Date date) {
    return date == null ? null : date.toInstant().atZone(WARSAW_ZONE_ID).toLocalDateTime();
  }

  public static Date localDateTimeToDate(LocalDateTime date) {
    return Date.from(date.atZone(WARSAW_ZONE_ID).toInstant());
  }

  public static Date getNow() {
    return new Date();
  }

  public static Date endOfDay() {
    return localDateTimeToDate(LocalDateTime.now().with(LocalTime.MAX));
  }

  public static Date subtractMinutes(Date date, Integer minutes) {
    return DateUtils.addMinutes(date, -minutes);
  }

  public static Date addMinutes(Date date, Integer minutes) {
    return DateUtils.addMinutes(date, minutes);
  }

  public static boolean compareByMinutes(Date date1, Date date2) {
    Calendar calendar1 = Calendar.getInstance();
    calendar1.setTime(date1);
    Calendar calendar2 = Calendar.getInstance();
    calendar2.setTime(date2);
    return calendar1.get(Calendar.YEAR) == calendar2.get(Calendar.YEAR)
        && calendar1.get(Calendar.MONTH) == calendar2.get(Calendar.MONTH)
        && calendar1.get(Calendar.DAY_OF_MONTH) == calendar2.get(Calendar.DAY_OF_MONTH)
        && calendar1.get(Calendar.HOUR_OF_DAY) == calendar2.get(Calendar.HOUR_OF_DAY)
        && calendar1.get(Calendar.MINUTE) == calendar2.get(Calendar.MINUTE);
  }

}

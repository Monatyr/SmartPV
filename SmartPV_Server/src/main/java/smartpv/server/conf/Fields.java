package smartpv.server.conf;

import java.util.List;
import org.apache.commons.lang3.StringUtils;

public class Fields {

  public static final String FARM_ID_FIELD = "farmId";
  public static final String DATE_FIELD = "date";
  public static final String MEASUREMENTS_FIELD = "measurements";

  public static String concat(List<String> strings) {
    return StringUtils.join(strings, '.');
  }

}

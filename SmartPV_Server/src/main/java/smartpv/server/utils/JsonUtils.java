package smartpv.server.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static ObjectMapper getObjectMapper() {
    return objectMapper;
  }

  public static String toJson(Class<?> data) {
    try {
      return objectMapper.writeValueAsString(data);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

}

package smartpv.management.algorithms;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import smartpv.server.conf.EnvNames;
import smartpv.server.utils.JsonUtils;


@Slf4j
@Component
public class Counter {

  private final RestTemplate restTemplate;
  private final String counterUrl;
  private final String simpsonEndpoint;
  private final String averageEndpoint;

  private final String durationEndpoint;

  @Autowired
  public Counter(
      @Value("${" + EnvNames.COUNTER_URL + "}") String counterUrl,
      @Value("${" + EnvNames.COUNTER_SIMPSON_ENDPOINT + "}") String simpsonEndpoint,
      @Value("${" + EnvNames.COUNTER_AVERAGE_ENDPOINT + "}") String averageEndpoint,
      @Value("${" + EnvNames.COUNTER_DURATION_ENDPOINT + "}") String durationEndpoint,
      RestTemplateBuilder restTemplateBuilder
  ) {
    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
    restTemplate = restTemplateBuilder.build();
    this.restTemplate.setRequestFactory(requestFactory);
    this.counterUrl = counterUrl;
    this.simpsonEndpoint = simpsonEndpoint;
    this.averageEndpoint = averageEndpoint;
    this.durationEndpoint = durationEndpoint;
  }

  public Double countAverage(List<Double> data) {
    try {
      return request(counterUrl.concat(averageEndpoint), JsonUtils.getObjectMapper().writeValueAsString(data));
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  public Double countDuration(Map<Date, Boolean> data) {
    try {
      return request(counterUrl.concat(durationEndpoint), JsonUtils.getObjectMapper().writeValueAsString(data));
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  public Double countSimpson(Map<Date, Double> data) {
    try {
      return request(counterUrl.concat(simpsonEndpoint), JsonUtils.getObjectMapper().writeValueAsString(data));
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }


  public Double request(String url, String data) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    return sendRequest(
        url,
        httpHeaders,
        data
    ).getBody();
  }

  private ResponseEntity<Double> sendRequest(String url, HttpHeaders headers, String body) {
    HttpEntity<String> request = new HttpEntity<>(body, headers);
    return restTemplate.postForEntity(
        url,
        request,
        Double.class
    );
  }
}
package smartpv.management.device;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import smartpv.management.device.parsers.Response;
import smartpv.management.device.parsers.StringToResponseClassParser;
import smartpv.server.utils.Action;
import smartpv.server.utils.HttpEndpointData;

@Slf4j
@Component
public class DeviceRequester {

  private final StringToResponseClassParser stringToResponseClassParser;
  private final RestTemplate restTemplate;

  @Autowired
  public DeviceRequester(
      RestTemplateBuilder restTemplateBuilder,
      StringToResponseClassParser stringToResponseClassParser
  ) {
    this.stringToResponseClassParser = stringToResponseClassParser;
    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
    this.restTemplate = restTemplateBuilder.build();
    this.restTemplate.setRequestFactory(requestFactory);
  }

  public Response request(Device device, Action action) throws ClassNotFoundException {
    HttpEndpointData httpEndpointData = device.getEndpoints().stream()
        .filter((e) -> e.action().equals(action)).findFirst()
        .orElseThrow(NullPointerException::new);
    String url = device.getIpAddress().concat(httpEndpointData.endpoint());

    return sendRequest(
        url,
        httpEndpointData.httpHeaders(),
        httpEndpointData.httpMethod(),
        stringToResponseClassParser.stringToResponseClass(httpEndpointData.responseClass())
    ).getBody();
  }

  private ResponseEntity<Response> sendRequest(String url, HttpHeaders headers,
      HttpMethod httpMethod, Class responseClass) {
    HttpEntity request = new HttpEntity(headers);
    return restTemplate.exchange(
        url,
        httpMethod,
        request,
        responseClass
    );
  }
}

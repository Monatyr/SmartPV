package smartpv.server.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import smartpv.management.device.parsers.ResponseType;

public record HttpEndpointData(String description, Action action, String endpoint,
                               HttpMethod httpMethod, HttpHeaders httpHeaders,
                               ResponseType responseClass) {

}


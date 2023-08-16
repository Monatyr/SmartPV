package smartpv;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import smartpv.server.conf.BeforeStart;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan
public class ServerApplication implements CommandLineRunner {

  private final BeforeStart beforeStart;

  public ServerApplication(BeforeStart beforeStart) {
    this.beforeStart = beforeStart;
  }

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

  @Override
  public void run(String[] args) {
    beforeStart.printLogs();
    //beforeStart.updateConsumingDeviceStatusInDatabase();
  }
}

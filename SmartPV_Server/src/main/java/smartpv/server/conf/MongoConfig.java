package smartpv.server.conf;


import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.ClassModel;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import smartpv.consumption.persistence.record.ConsumptionEntity;
import smartpv.measurement.persistence.record.MeasurementEntity;

@Configuration
public class MongoConfig {

  private final String mongoConnUri;
  private final String dbName;
  private final CodecRegistry codecRegistry;


  public MongoConfig(
      @Value("${" + EnvNames.MONGO_CONNECTION_URI + "}") String mongoConnUri,
      @Value("${" + EnvNames.MONGO_DB_NAME + "}") String dbName
  ) {
    this.mongoConnUri = mongoConnUri;
    this.dbName = dbName;
    this.codecRegistry = CodecRegistries
        .fromRegistries(
            MongoClientSettings.getDefaultCodecRegistry(),
            CodecRegistries.fromProviders(
                PojoCodecProvider.builder()
                    .register(ClassModel.builder(ConsumptionEntity.class).build())
                    .register(ClassModel.builder(MeasurementEntity.class).build())
                    .build())
        );
  }

  @Bean
  public MongoClient mongoClient() {
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(mongoConnUri))
        .codecRegistry(codecRegistry)
        .build();
    return MongoClients.create(settings);
  }

  @Bean
  public MongoDatabase mongoDatabase(MongoClient client) {
    return client.getDatabase(dbName);
  }
}

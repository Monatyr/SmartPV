package smartpv.server.conf;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
public class MongoUtils {

  public static <T> MongoCollection<T> getCollection(MongoDatabase mongoDatabase, Class<T> persistenceClass) {
    String collectionName = persistenceClass.getAnnotation(Document.class).collection();
    return mongoDatabase.getCollection(collectionName, persistenceClass);
  }
}

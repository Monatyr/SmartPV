import pymongo
import requests
from bson.objectid import ObjectId
from collections import defaultdict
from dateutil import tz

LOCAL_DB_URL = "mongodb://localhost:27017/smartPV"
PROD_DB_URL = "mongodb+srv://janicki:janicki@smartpv.dr74ruo.mongodb.net/smartpv?retryWrites=true&w=majority"
client = pymongo.MongoClient(LOCAL_DB_URL)
db = client.smartPV
measurement_entity_collection = db.measurementEntity
measurement_device_entity_collection = db.measurementDeviceEntity

measurements = list(map(lambda measurement: (measurement["date"], measurement["measurements"]),
                        measurement_entity_collection.find({}).sort([("date", pymongo.ASCENDING)])))

measurement_devices = list(map(lambda device: device["_id"], measurement_entity_collection.find({})))

statistics = defaultdict(lambda: dict())

for measurement in measurements:
  [date, measurement_measurements] = measurement
  date = date.replace(tzinfo=tz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%f%z')
  for device, measurement_measurement in measurement_measurements.items():
    statistics[device][date] = measurement_measurement

for device, data in statistics.items():
  request = requests.post('http://127.0.0.1:5000/simpson', json=data)
  result = request.json()
  measurement_device_entity_collection.update_many(
      {
        "_id": ObjectId(device)
      },
      {
        "$set": {
          "measuredEnergy": result
        }
      }
  )

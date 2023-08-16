import pymongo
import requests
from bson.objectid import ObjectId
from collections import defaultdict
from dateutil import tz

LOCAL_DB_URL = "mongodb://localhost:27017/smartPV"
PROD_DB_URL = "mongodb+srv://janicki:janicki@smartpv.dr74ruo.mongodb.net/smartpv?retryWrites=true&w=majority"
client = pymongo.MongoClient(LOCAL_DB_URL)
db = client.smartPV
consumption_entity_collection = db.consumptionEntity
consumption_device_entity_collection = db.consumptionDeviceEntity

consumptions = list(map(lambda consumption: (consumption["date"], consumption["activeDevicesIds"]),
                        consumption_entity_collection.find({}).sort([("date", pymongo.ASCENDING)])))

consumption_devices = list(map(lambda device: device["_id"], consumption_device_entity_collection.find({})))

statistics = defaultdict(lambda: dict())

for consumption in consumptions:
  [date, consumption_ids] = consumption
  date = date.replace(tzinfo=tz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%f%z')
  for device in consumption_devices:
    device = str(device)
    statistics[device][date] = device in consumption_ids

for device, data in statistics.items():
  request = requests.post('http://127.0.0.1:5000/duration', json=data)
  result = request.json()
  consumption_device_entity_collection.update_many(
      {
        "_id": ObjectId(device)
      },
      {
        "$set": {
          "workingHours": result
        }
      }
  )

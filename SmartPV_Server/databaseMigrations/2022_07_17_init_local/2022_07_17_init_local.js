db.getCollection('measurementDeviceEntity').remove({})
db.getCollection('measurementEntity').remove({})
db.getCollection('consumptionDeviceEntity').remove({})
db.getCollection('consumptionEntity').remove({})
db.getCollection('farmEntity').remove({})

db.getCollection('farmEntity').insertMany(
    [
      {
        "name": "test",
        "description": "test"
      }
    ]
)

const farmId = db.getCollection('farmEntity').findOne(
    {name: "test"})['_id'].str

db.getCollection('measurementDeviceEntity').insertMany([
      ["miernik1",
        "http://127.0.0.1:3005/measurement/device/1"],
      ["miernik2",
        "http://127.0.0.1:3005/measurement/device/2"]
    ].map(function (obj) {
      return {
        "farmId": farmId,
        "name": obj[0],
        "ipAddress": obj[1],
        "endpoints": [
          {
            "description": "Odczytaj pomiar mocy",
            "action": "READ",
            "endpoint": "",
            "httpMethod": "GET",
            "httpHeaders": {
              "format": "json",
            },
            "responseClass": "SUPLA_ELECTRIC_METER"
          }
        ],
        "_class": "measuring.MeasuringDeviceEntity"
      }
    })
)

db.getCollection('consumptionDeviceEntity').insertMany(
    [
      ["dev0",
        "http://127.0.0.1:3005/consumption/device/0"],
      ["dev1",
        "http://127.0.0.1:3005/consumption/device/1"],
      ["dev2",
        "http://127.0.0.1:3005/consumption/device/2"],
      ["dev3",
        "http://127.0.0.1:3005/consumption/device/3"],
      ["dev4",
        "http://127.0.0.1:3005/consumption/device/4"],
      ["dev5",
        "http://127.0.0.1:3005/consumption/device/5"]
    ].map(function (obj) {
      return {
        "farmId": farmId,
        "name": obj[0],
        "ipAddress": obj[1],
        "isOn": false,
        "endpoints": [
          {
            "description": "Odczytaj status",
            "action": "READ",
            "endpoint": "",
            "httpMethod": "GET",
            "httpHeaders": {
              "format": "json",
            },
            "responseClass": "SUPLA_STATUS"
          },
          {
            "description": "Włącz urządzenie",
            "action": "TURN_ON",
            "endpoint": "/true",
            "httpMethod": "POST",
            "httpHeaders": {
              "format": "json",
            },
            "responseClass": "SUPLA_SWITCH"
          },
          {
            "description": "Wyłącz urządzenie",
            "action": "TURN_OFF",
            "endpoint": "/false",
            "httpMethod": "POST",
            "httpHeaders": {
              "format": "json",
            },
            "responseClass": "SUPLA_SWITCH"
          }
        ],
        "controlParameters": {
          "priority": Math.floor(Math.random() * 10 + 1),
          "powerConsumption": Math.floor(Math.random() * 10 + 1),
          "minHysteresis": 0,
          "maxHysteresis": 0,
          "lock": {
            "isLocked": "false",
            "date": Date()
          }
        },
        "_class": "measuring.ConsumptionDeviceEntity"
      }
    })
)

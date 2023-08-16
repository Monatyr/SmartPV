/*db.getCollection('measurementDeviceEntity').remove({})
db.getCollection('measurementEntity').remove({})
db.getCollection('consumptionDeviceEntity').remove({})
db.getCollection('farmEntity').remove({})*/

db.getCollection('farmEntity').insertMany(
    [
      {
        "name": "hala",
        "description": "goralmet"
      }
    ]
)

const farmId = db.getCollection('farmEntity').findOne(
    {name: "hala"})._id.toString()

db.getCollection('measurementDeviceEntity').insertMany([
      ["FIRMA przyłącz B1 od 16.04.21",
        "https://svr48.supla.org/direct/796/F9UcCeMbvPH7C/"],
      ["FIRMA przyłącz A2 od 19.10.21",
        "https://svr48.supla.org/direct/797/cuE_stqFnXHfwP8u"]
    ].map(function (obj) {
      return {
        "farmId": farmId,
        "name": obj[0],
        "ipAddress": obj[1],
        "endpoints": [
          {
            "description": "Odczytaj pomiar mocy",
            "action": "READ",
            "endpoint": "/read",
            "httpMethod": "PATCH",
            "httpHeaders": {
              "format": "json",
              "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
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
      ["PRODUKCJA 1+2",
        "https://svr48.supla.org/direct/819/WgEUDpThxY5Q/"],
      ["HALA A [BRAMA]",
        "https://svr48.supla.org/direct/808/3Ft4LJLcVfcU/"],
      ["HALA B [BRAMA WYJAZDOWA]",
        "https://svr48.supla.org/direct/821/rASeTsBkkMEDry/"],
      ["HALA B B1|B2 [NAD DRZWIAMI DO PROD] + B9 [NAD PRZEJAZDEM]",
        "https://svr48.supla.org/direct/820/CUGuG5ojB4rs/"],
      ["HALA A [RAMPA]",
        "https://svr48.supla.org/direct/809/_mPznkz8CERYzH/"],
      ["STREFA LABO - ROLKOWNIA",
        "https://svr48.supla.org/direct/818/PadWCuMuncG/"],
      ["HALA C [C5/C6]",
        "https://svr48.supla.org/direct/801/csz8fqo2rp/"],
      ["HALA C [C9/C10]",
        "https://svr48.supla.org/direct/802/fA_H7veNeSVRRtd/"],
      ["HALA C [C1/C2]",
        "https://svr48.supla.org/direct/800/hDidSo534QwB3jrB/"],
      ["HALA C [C13/C14]",
        "https://svr48.supla.org/direct/803/vdkaqTX5As/"]
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
            "endpoint": "/read",
            "httpMethod": "PATCH",
            "httpHeaders": {
              "format": "json",
              "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
            },
            "responseClass": "SUPLA_SWITCH"
          },
          {
            "description": "Włącz urządzenie",
            "action": "TURN_ON",
            "endpoint": "/turn-on_mock",
            "httpMethod": "PATCH",
            "httpHeaders": {
              "format": "json",
              "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
            },
            "responseClass": "SUPLA_SWITCH"
          },
          {
            "description": "Wyłącz urządzenie",
            "action": "TURN_OFF",
            "endpoint": "/turn-off_mock",
            "httpMethod": "PATCH",
            "httpHeaders": {
              "format": "json",
              "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
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

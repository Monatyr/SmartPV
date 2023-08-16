const consumptionDevicesFilter = {};
const consumptionDevicesUpdate = {
  $set: {
    "controlParameters.priority": 0,
    "controlParameters.powerConsumption": 4,
    "controlParameters.lock": {
      isLocked: false,
      date: new Date()
    },
    endpoints: [
      {
        "description": "Odczytaj status",
        "action": "READ",
        "endpoint": "/read",
        "httpMethod": "PATCH",
        "httpHeaders": {
          "format": "json",
          "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
        },
        "responseClass": "SUPLA_STATUS"
      },
      {
        "description": "Włącz urządzenie",
        "action": "TURN_ON",
        "endpoint": "/turn-on",
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
        "endpoint": "/turn-off",
        "httpMethod": "PATCH",
        "httpHeaders": {
          "format": "json",
          "authorization": "Bearer Mzg5ZWNhY2I5ZjZmNTkzNjAxNDgyN2U2NWI2NzYyMmJjOGFmNTYxYWFmMDBlOWM4YjFmOTMxOTU0MjliNWVmMw.aHR0cHM6Ly9zdnI0OC5zdXBsYS5vcmc="
        },
        "responseClass": "SUPLA_SWITCH"
      }
    ]
  },
  $unset: {
    "entity.controlParameters.isLocked": ""
  }
}

const farmsFilter = {}
const farmsUpdate = {
  $set: {
    algorithmType: "POWER_PRIORITY_ALGORITHM",
    energyLimit: 0,
    minutesBetweenDeviceStatusSwitch: 16
  }
}

const farmId = db.getCollection('farmEntity').findOne({})._id.toString()
const consumptionFilter = {}
const consumptionUpdate = {
  $set: {
    farmId: farmId
  }
}

db.getCollection('consumptionDeviceEntity').updateMany(consumptionDevicesFilter, consumptionDevicesUpdate)
db.getCollection('farmEntity').updateMany(farmsFilter, farmsUpdate)
db.getCollection('consumptionEntity').updateMany(consumptionFilter, consumptionUpdate)

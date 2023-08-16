const consumptionDevicesFilter = {};
const consumptionDevicesUpdate = {
  $unset: {
    lastStatusChange: ""
  },
  $set: {
    "controlParameters.lastStatusChange": new Date()
  }
}

db.getCollection('consumptionDeviceEntity').updateMany(consumptionDevicesFilter, consumptionDevicesUpdate)

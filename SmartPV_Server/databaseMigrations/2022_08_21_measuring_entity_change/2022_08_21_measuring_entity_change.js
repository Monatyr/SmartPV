// this gives an object with dates as keys
const data = db.getCollection('measurementEntity').find({}).toArray()
const groups = data.reduce((groups, game) => {
  //dates
  const date1 = game.date;
  if (!groups[date1]) {
    groups[date1] = [];
  }
  groups[date1].push(game);
  return groups;
}, {});

const groupArrays = Object.keys(groups).map((date) => {
  return {
    date,
    ids: groups[date]
  };
});

const res =groupArrays.map(function (group) {
  const groupDate = group.date;
  const measurement = group.ids.map(function (id) {
    return id.measurement;
  }).reduce((a, b) => a + b, 0);
  const measurements = group.ids.map(function (id) {
    return {
      [id.deviceId]: id.measurement
    }
  })

  return {
    "farmId": "63015c094a0d17ef53364b09",
    "measurement": measurement,
    "measurements": measurements,
    "date": new Date(groupDate),
    "_class": "measurement.persistence.record.MeasurementEntity"
  }
})
db.getCollection('measurementEntity').remove({})
db.getCollection('measurementEntity').insertMany(res)

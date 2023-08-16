import datetime as dt

import matplotlib.pyplot as plt
import pymongo
from dateutil import tz


def prepare_consumption_time_plot(db, day: dt.datetime):
  consumption_device_entity_collection = db.consumptionDeviceEntity
  consumption_entity_collection = db.consumptionEntity

  day_start = dt.datetime(day.year, day.month, day.day, day.hour + 4, tzinfo=tz.UTC)
  day_end = day_start + dt.timedelta(days=1) - dt.timedelta(hours=7)

  consumptions = list(map(lambda consumption: (datetime_to_datetime_without_seconds(consumption["date"]),
                                               consumption["activeDevicesIds"]),
                          consumption_entity_collection
                          .find({"date": {'$lt': day_end, '$gt': day_start}})
                          .sort([("date", pymongo.ASCENDING)])))
  devices = list(map(lambda device: (str(device["_id"]), device["name"]),
                     consumption_device_entity_collection
                     .find({})
                     .sort([("date", pymongo.ASCENDING)])))

  times = dict.fromkeys(list(map(lambda device: device[0], devices)), 0)
  for idx, consumption in enumerate(consumptions[:-1]):
    (c1_date, c1_devices) = consumption
    (c2_date, c2_devices) = consumptions[idx + 1]
    for device in c1_devices:
      if device in c2_devices:
        minutes_diff = (c2_date - c1_date).seconds // 60
        times[device] += minutes_diff
  label_length = 25
  name_with_time = list(map(lambda device: (
    (device[1][:label_length] + '..') if len(device[1]) > label_length else device[1], times[device[0]]), devices))

  plt.rcParams["figure.figsize"] = [18.00, 10]
  fig, ax = plt.subplots()
  ax.bar(list(map(lambda item: item[0], name_with_time)), list(map(lambda item: item[1], name_with_time)))
  day_start_warsaw = (day_start).astimezone(tz.gettz("Europe/Warsaw"))
  day_end_warsaw = (day_end).astimezone(tz.gettz("Europe/Warsaw"))
  ax.set_xlabel('Odczyt z dni ' + str(day_start_warsaw) + " - " + str(day_end_warsaw), size=25)
  plt.title('Wykres czasu działania w zależności od urządzenia', size=25)
  ax.set_ylabel('Czas działania w minutach', color='y', size=25)
  ax.yaxis.grid()
  for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontsize(16)
  fig.autofmt_xdate()
  plt.tight_layout()
  return plt


def datetime_to_datetime_without_seconds(date: dt.datetime):
  return dt.datetime(date.year, date.month, date.day, date.hour, date.minute, 0, 0)

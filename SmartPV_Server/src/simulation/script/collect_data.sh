#!/bin/bash
#run form base dir

for DAY in "$@"
do
  START_DATE=$DAY"T00:00:00.000+02:00"
  END_DATE=$DAY"T23:59:59.999+02:00"

  mongoexport "mongodb+srv://smartpv.dr74ruo.mongodb.net/smartpv" --username janicki --password janicki -d=smartpv -c=measurementEntity --out=src/simulation/data/$DAY-measurementEntity.json -q='{"date": { "$gte": { "$date": "'$START_DATE'" }, "$lt": {"$date": "'$END_DATE'"} }}'
  mongoexport "mongodb+srv://smartpv.dr74ruo.mongodb.net/smartpv" --username janicki --password janicki -d=smartpv -c=consumptionEntity --out=src/simulation/data/$DAY-consumptionEntity.json -q='{"date": { "$gte": { "$date": "'$START_DATE'" }, "$lt": {"$date": "'$END_DATE'"} }}'
done

#mongoexport "mongodb+srv://smartpv.dr74ruo.mongodb.net/smartpv" --username janicki --password janicki -d=smartpv -c=consumptionDeviceEntity --out=src/simulation/data/consumptionDeviceEntity.json


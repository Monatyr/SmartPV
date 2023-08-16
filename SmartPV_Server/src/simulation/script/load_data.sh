#!/bin/bash

mongo "localhost:27018/smartpv" --eval 'db.measurementEntity.drop()'
mongo "localhost:27018/smartpv" --eval 'db.consumptionEntity.drop()'
mongo "localhost:27018/smartpv" --eval 'db.consumptionDeviceEntity.drop()'

for DAY in "$@"
do
  mongoimport --host=localhost --port=27018 --db=smartpv --collection=measurementEntity --type=json --file=src/simulation/data/$DAY-measurementEntity.json
  mongoimport --host=localhost --port=27018 --db=smartpv --collection=consumptionEntity --type=json --file=src/simulation/data/$DAY-consumptionEntity.json
done

mongoimport --host=localhost --port=27018 --db=smartpv --collection=consumptionDeviceEntity --type=json --file=src/simulation/data/consumptionDeviceEntity.json
#mongoimport --host=localhost --port=27018 --db=smartpv --collection=farmEntity --type=json --file=src/simulation/data/farmEntity.json

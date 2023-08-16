import datetime
import matplotlib.pyplot
import os
import pymongo

from active_devices_time import prepare_consumption_time_plot
from measurement_active_devices_num import measurement_active_devices_num_plot

LOCAL_DB_URL = "mongodb://localhost:27018/smartpv"
PROD_DB_URL = "mongodb+srv://janicki:janicki@smartpv.dr74ruo.mongodb.net/smartpv?retryWrites=true&w=majority"
ALGORITHM = "power-priority"


def run_drawer_prod(days: [datetime.datetime]):
  run_drawer(days, True, PROD_DB_URL)


def run_drawer_locally(days: [datetime.datetime]):
  run_drawer(days, False, LOCAL_DB_URL)


def run_drawer(days: [datetime.datetime], is_production_data: bool, db_url: str):
  client = pymongo.MongoClient(db_url)
  db = client.smartpv
  for day in days:
    plt = measurement_active_devices_num_plot(db, day, is_production_data)
    file_name = str(day.date()) + "-" + ("pr" if is_production_data else "lc") + "-" + str(ALGORITHM) + "-num"
    file_path = "charts/" + str(day.date())
    save_plt(plt, file_path, file_name)
    show_plt(plt)

    plt_time = prepare_consumption_time_plot(db, day)
    file_name = str(day.date()) + "-" + ("pr" if is_production_data else "lc") + "-" + str(ALGORITHM) + "-time"
    file_path = "charts/" + str(day.date())
    save_plt(plt_time, file_path, file_name)
    show_plt(plt_time)


def show_plt(plt: matplotlib.pyplot.plot):
  plt.show()


def save_plt(plt: matplotlib.pyplot.plot, results_dir: str, file_name: str):
  script_dir = os.path.dirname(__file__)
  script_result_dir = os.path.join(script_dir, results_dir + "/")
  if not os.path.isdir(script_result_dir):
    os.makedirs(script_result_dir)

  plt.gcf().savefig(script_result_dir + file_name)


if __name__ == "__main__":
  days = [
    datetime.datetime(2022, 8, 28),
    datetime.datetime(2022, 8, 29),
    datetime.datetime(2022, 9, 18),
    datetime.datetime(2022, 9, 29),
    datetime.datetime(2022, 9, 30),
    datetime.datetime(2022, 10, 11),
    datetime.datetime(2022, 10, 14),
    datetime.datetime(2022, 10, 17),
  ]
  run_drawer_locally(days)
  run_drawer_prod(days)

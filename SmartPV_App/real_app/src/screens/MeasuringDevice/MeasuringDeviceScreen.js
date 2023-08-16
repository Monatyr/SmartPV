import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from "react-native-responsive-linechart";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default function ConsumerDeviceScreen({ route, navigation }) {
  const {
    name,
    measuredEnergy,
    ipAddress,
    farmId,
    id,
    creationDate,
    deviceModel,
  } = route.params;

  const [chartState, setChartState] = useState(0);
  const [chartName, setChartName] = useState("Device activity");
  const [yLabels, setYLabels] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yDomain, setYDomain] = useState({ min: 0, max: 1.25 });
  const [xDomain, setXDomain] = useState({ min: 0, max: 7 });
  var maxY = 1.25;
  var minY = 0;

  const [viewportWidth, setViewportWidth] = useState(50);
  const [horizontalTickValues, setHorizontalTickValues] = useState([]);
  const [verticalTickValues, setVerticalTickValues] = useState([0, 1]);
  var dates = [];

  var promises = [];
  var tempReadings = [];

  var toDate = new Date();
  var day = toDate.getDate();
  toDate.setDate(toDate.getDate() + 1);
  if (toDate.getDate() === day) toDate.setDate(toDate.getDate() + 1);
  toDate.setHours(0, 0, 0, 0);
  var fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 7);

  const [latestMeasurement, setLatestMeasurement] = useState();
  const [farmName, setFarmName] = useState();
  const [measurements, setMeasurements] = useState([{ x: 0, y: 0 }]);

  const [oneWeekStyle, setOneWeekStyle] = useState({ color: "gray" });
  const [oneMonthStyle, setOneMonthStyle] = useState({ color: "black" });
  const [threeMonthsStyle, setThreeMonthsStyle] = useState({ color: "black" });

  const [oneWeekBorder, setOneWeekBorder] = useState({ borderColor: "gray" });
  const [oneMonthBorder, setOneMonthBorder] = useState({
    borderColor: "black",
  });
  const [threeMonthsBorder, setThreeMonthsBorder] = useState({
    borderColor: "black",
  });

  const buttonBorderSetters = [
    setOneWeekBorder,
    setOneMonthBorder,
    setThreeMonthsBorder,
  ];

  const buttonTextSetters = [
    setOneWeekStyle,
    setOneMonthStyle,
    setThreeMonthsStyle,
  ];

  const updateButtonStyle = (buttonNum) => {
    for (var i = 0; i < buttonBorderSetters.length; i++) {
      var styleColor = i != buttonNum ? "black" : "gray";
      buttonBorderSetters[i]({ borderColor: styleColor });
      buttonTextSetters[i]({ color: styleColor });
    }
  };

  const getVerticalLabels = (lowest, highest, steps) => {
    var res = [0];
    lowest /= 1000;
    highest /= 1000;
    highest = Math.round(highest / 10) * 10 + 10;
    lowest = Math.round(lowest / 10) * 10 - 10;
    const step = Math.floor((highest - lowest) / steps);
    for (let i = 0; i < steps + 1; i++) {
      if (Math.abs(lowest) >= 10) res.push(lowest);
      lowest += step;
    }
    return res;
  };

  const getLatestMeasurement = async () => {
    const response = await fetch(
      `https://smart-pv.herokuapp.com/measurement/devices/${id}/last`,
      { method: "GET" }
    );
    const responseJson = await response.json();
    setLatestMeasurement(responseJson.measurement);
  };

  const getFarmName = async () => {
    const response = await fetch(
      `https://smart-pv.herokuapp.com/management/farms/${global.farmId}`,
      { method: "GET" }
    );
    const responseJson = await response.json();
    setFarmName(responseJson.name);
  };

  const getLastDayReadings = async () => {
    dates = [];
    var endDate = new Date();
    var startDate = new Date(endDate);
    var tempData = [{ x: 0, y: 0 }];
    var tempHorizontalValues = [];
    var tempMaxY = 1;
    var tempMinY = 0;
    startDate.setDate(startDate.getDate() - 1);

    const response = await fetch(
      `https://smart-pv.herokuapp.com/measurement/devices/${id}/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      { method: "GET" }
    );
    const responseJson = await response.json();
    var responseEntries = Object.entries(responseJson);
    responseEntries.sort((a, b) => (a[1]["date"] > b[1]["date"] ? 1 : -1));

    for (let i = 1; i < responseEntries.length; i++) {
      if (responseEntries[i][1]["measurement"] != null) {
        var value = (responseEntries[i][1]["measurement"] / 1000).toFixed(2);
        tempData.push({ x: i, y: value });
        // if (value > maxY) maxY = value;
        // if (value < minY) minY = value;
        if (value > tempMaxY) tempMaxY = value;
        if (value < tempMinY) tempMinY = value;
      } else {
        tempData.push({ x: i, y: 0 });
      }
      if (i % 5 == 0) {
        dates.push(
          responseEntries[i][1]["date"]
            .split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":")
        );
        tempHorizontalValues.push(i);
      }
    }
    setMeasurements(tempData);
    // setMaxY(tempMaxY);
    // setMinY(tempMinY);
    setYLabels([...Array(11).keys()].map((i) => i * 10 + -50));
    setVerticalTickValues([...Array(11).keys()].map((i) => i * 10 + -50));
    setXLabels(dates);
    setHorizontalTickValues(tempHorizontalValues);
    setXDomain({ min: 0, max: responseEntries.length });
    setYDomain({ min: -50, max: 50 });
    setViewportWidth(40);
  };

  const asyncGetDayReading = (fromD, toD, iterId) => {
    return new Promise((resolve) => {
      fetch(
        `https://smart-pv.herokuapp.com/measurement/devices/${id}/statistics/period?startDate=${fromD.toISOString()}&endDate=${toD.toISOString()}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson > maxY) maxY = responseJson;
          if (responseJson < minY) minY = responseJson;
          tempReadings.push({ x: iterId, y: 20000 });
          // tempReadings.push({ x: iterId, y: 0 });
          tempReadings.push({ x: iterId, y: responseJson });
          tempReadings.push({ x: iterId + 0.5, y: responseJson });
          // tempReadings.push({ x: iterId + 0.5, y: 0 });
          tempReadings.push({ x: iterId + 0.5, y: 20000 });
        })
        .then(() => resolve());
    });
  };

  const getReadingsByDay = async (days) => {
    tempReadings = [];
    dates = [];

    toDate = new Date();
    var day = toDate.getDate();
    toDate.setDate(toDate.getDate() + 1);
    if (toDate.getDate() === day) toDate.setDate(toDate.getDate() + 1);
    toDate.setHours(0, 0, 0, 0);
    fromDate = new Date(toDate);
    fromDate.setDate(toDate.getDate() - days);
    for (let i = 0; i < days; i++) {
      toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 1);
      promises.push(asyncGetDayReading(fromDate, toDate, i));
      dates.push(
        toDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .slice(1, 3)
          .reverse()
          .join("/")
      );
      fromDate.setDate(fromDate.getDate() + 1);
    }

    Promise.all(promises).then(async () => {
      setMeasurements(tempReadings);
      // setYDomain({ min: minY - 15000, max: 0 });
      setYDomain({ min: minY - 15000, max: maxY + 10 });
      var vL = getVerticalLabels(minY, maxY, 10);
      setVerticalTickValues(vL.map((x) => x * 1000));
      setXLabels(dates);
      setChartName("Energy produced [kW]");
      setChartState(1);
      setViewportWidth(7);
    });
  };

  useLayoutEffect(() => {
    getLatestMeasurement();
    getFarmName();
    getLastDayReadings();
  }, []);

  const setFromDate = (subtractDays = 0, subtractMonths = 0) => {
    fromDate.setMonth(currentDate.getMonth() - subtractMonths);
    fromDate.setDate(currentDate.getDate() - subtractDays);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#1C64BB"} />
      <View style={[styles.graph]}>
        <Chart
          viewport={{ size: { width: viewportWidth } }}
          style={{ height: 260, width: "100%" }}
          xDomain={xDomain}
          yDomain={yDomain}
          padding={{ left: 30, top: 10, bottom: 20, right: 20 }}
        >
          <VerticalAxis
            tickValues={verticalTickValues}
            theme={{
              labels: {
                label: { fontSize: 8, fontWeight: "400" },
                formatter: (v) => {
                  if (chartState == 0) {
                    return v.toFixed(1);
                  }
                  return (v / 1000).toFixed(1);
                },
              },
            }}
          />
          <HorizontalAxis
            tickValues={horizontalTickValues}
            theme={{
              axis: { stroke: { color: "#aaa", width: 2 } },
              ticks: { stroke: { color: "#aaa", width: 2 } },
              labels: {
                label: { rotation: 0 },
                formatter: (v) => {
                  if (chartState == 0) {
                    return xLabels[Math.floor(v / 5) - 1];
                  }
                  return xLabels[Math.floor(v)];
                },
              },
            }}
          />

          {/* <Area
            theme={{
              gradient: {
                from: { color: "#227BEA", opacity: 0.75 },
                to: { color: "#227BEA", opacity: 0.1 },
              },
            }}
            data={measurements}
          /> */}

          <Line
            data={measurements}
            smoothing="none"
            theme={{ stroke: { color: "#227BEA", width: 1 } }}
          />
        </Chart>
        <Text style={styles.chartTitle}>Energy produced [kW]</Text>
      </View>
      <LinearGradient
        colors={[AppStyles.color.backgroundColor, "#B6B6B6"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1.5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={styles.buttons}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderRightWidth: 0,
                    borderBottomLeftRadius: 9,
                    borderTopLeftRadius: 9,
                  },
                  oneWeekBorder,
                ]}
                onPress={() => {
                  setChartState(0);
                  updateButtonStyle(0);
                  getLastDayReadings();
                }}
              >
                <Text style={oneWeekStyle}>1 DAY</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { borderWidth: 1, borderRightWidth: 0 },
                  oneMonthBorder,
                ]}
                onPress={() => {
                  updateButtonStyle(1);
                  getReadingsByDay(7);
                  setXDomain({ min: 0, max: 7 });
                  setHorizontalTickValues(
                    [...Array(7).keys()].map((x) => x + 0.25)
                  );
                }}
              >
                <Text style={oneMonthStyle}>1 WEEK</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderBottomRightRadius: 9,
                    borderTopRightRadius: 9,
                  },
                  threeMonthsBorder,
                ]}
                onPress={() => {
                  updateButtonStyle(2);
                  getReadingsByDay(30);
                  setXDomain({ min: 0, max: 30 });
                  setHorizontalTickValues(
                    [...Array(30).keys()].map((x) => x + 0.25)
                  );
                }}
              >
                <Text style={threeMonthsStyle}>1 MONTH</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: "99%",
              paddingHorizontal: 7,
              paddingBottom: 7,
              paddingTop: 20,
            }}
          >
            <View style={styles.deviceInfo}>
              <View style={[styles.deviceName]}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
                <Text>{deviceModel.toUpperCase()}</Text>
              </View>

              <View style={styles.detailedInfo}>
                <View
                  style={{
                    flex: 0.7,
                  }}
                >
                  <View style={[styles.cell]}>
                    <Text style={styles.firstColumnText}>
                      LATEST MEASUEREMENT
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      { backgroundColor: AppStyles.color.secondaryColor },
                    ]}
                  >
                    <Text style={styles.firstColumnText}>TOTAL PRODUCTION</Text>
                  </View>
                  <View style={[styles.cell]}>
                    <Text style={styles.firstColumnText}>FARM</Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      { backgroundColor: AppStyles.color.secondaryColor },
                    ]}
                  >
                    <Text style={styles.firstColumnText}>CREATION DATE</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View
                    style={[
                      styles.cell,
                      {
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    <Text>
                      {(latestMeasurement / 1000).toFixed(2) || ""} [kW]
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      {
                        backgroundColor: "white",
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    <Text>{(measuredEnergy / 1000).toFixed(2)} [kWh]</Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      {
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    {farmName != null && <Text>{farmName.toUpperCase()}</Text>}
                    {farmName == null && <Text>{farmId}</Text>}
                  </View>
                  <View
                    style={[
                      styles.cell,
                      {
                        backgroundColor: "white",
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    <Text>
                      {creationDate
                        .split("T")[0]
                        .replace("-", "/")
                        .replace("-", "/")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

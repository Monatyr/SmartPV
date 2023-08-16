import React, { useState, useLayoutEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from "react-native-responsive-linechart";
import { LinearGradient } from "expo-linear-gradient";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default function ConsumerDeviceScreen({ route, navigation }) {
  const [farmName, setFarmName] = useState("");
  const [activityMeasurements, setActivityMeasurements] = useState([
    { x: 0, y: 0 },
  ]);
  const [chartState, setChartState] = useState(0);
  const [chartName, setChartName] = useState("Device activity");
  const [yLabels, setYLabels] = useState(["OFF", "ON"]);
  const [xLabels, setXLabels] = useState([1]);
  const [yDomain, setYDomain] = useState({ min: 0, max: 1.25 });
  const [xDomain, setXDomain] = useState({ min: 0, max: 7 });
  var maxY = 1.25;

  const [viewportWidth, setViewportWidth] = useState(7);
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

  const {
    name,
    deviceModel,
    workingHours,
    isOn,
    controlParameters,
    creationDate,
    farmId,
    id,
  } = route.params;

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
    var previous = false;
    startDate.setDate(startDate.getDate() - 1);
    const response = await fetch(
      `https://smart-pv.herokuapp.com/consumption/devices/${id}/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      { method: "GET" }
    );
    const responseJson = await response.json();
    var responseEntries = Object.entries(responseJson);
    responseEntries.sort((a, b) => (a[0] > b[0] ? 1 : -1));

    for (let i = 0; i < responseEntries.length; i++) {
      if (previous != responseEntries[i][1]) {
        tempData.push({ x: i, y: previous === true ? 1 : 0 });
        tempData.push({ x: i, y: responseEntries[i][1] === true ? 1 : 0 });
      } else if (i % 5 == 0) {
        tempData.push({ x: i, y: responseEntries[i][1] === true ? 1 : 0 });
        dates.push(
          responseEntries[i][0].split("T")[1].split(":").slice(0, 2).join(":")
        );
        tempHorizontalValues.push(i);
      }
      previous = responseEntries[i][1];
    }
    setActivityMeasurements(tempData);
    setXLabels(dates);
    setHorizontalTickValues(tempHorizontalValues);
    setVerticalTickValues([0, 1]);
    setYLabels(["OFF", "ON"]);
    setYDomain({ min: 0, max: 1.25 });
    setXDomain({ min: 0, max: 720 });
    setViewportWidth(40);
    setChartName("Device activity");
  };

  const asyncGetDayReading = (fromD, toD, iterId) => {
    return new Promise((resolve) => {
      fetch(
        `https://smart-pv.herokuapp.com/consumption/devices/${id}/statistics/period?startDate=${fromD.toISOString()}&endDate=${toD.toISOString()}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson > maxY) maxY = responseJson;
          tempReadings.push({ x: iterId, y: 0 });
          tempReadings.push({ x: iterId, y: responseJson });
          tempReadings.push({ x: iterId + 0.5, y: responseJson });
          tempReadings.push({ x: iterId + 0.5, y: 0 });
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
      setActivityMeasurements(tempReadings);
      setYDomain({ min: 0, max: 28 });
      var tempArr = [...Array(25).keys()].filter((x) => x % 4 == 0);
      setVerticalTickValues(tempArr);
      setYLabels(tempArr);
      setXLabels(dates);
      setChartName("Device activity (hours)");
    });
  };

  useLayoutEffect(() => {
    getFarmName();
    getLastDayReadings();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#1C64BB"} />
      <View style={styles.graph}>
        <Chart
          viewport={{ size: { width: viewportWidth } }}
          style={{ height: 260, width: "100%" }}
          xDomain={xDomain}
          yDomain={yDomain}
          padding={{ left: 25, top: 10, bottom: 20, right: 20 }}
        >
          <VerticalAxis
            tickValues={verticalTickValues}
            theme={{
              labels: {
                label: { fontSize: 8, fontWeight: "400" },
                formatter: (v) => {
                  if (yLabels[0] != "OFF") return v;
                  return yLabels[v];
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
                  if (chartState != 0) return xLabels[v.toFixed(0)];
                  if (v % 5 == 0) {
                    return xLabels[Math.floor(v.toFixed(0) / 5)];
                  }
                  return "";
                },
              },
            }}
          />

          <Area
            theme={{
              gradient: {
                from: { color: "#227BEA", opacity: 0.5 },
                to: { color: "#227BEA", opacity: 0.1 },
              },
            }}
            data={activityMeasurements}
          />
          <Line
            data={activityMeasurements}
            smoothing="none"
            theme={{ stroke: { color: "#227BEA", width: 1 } }}
          />
        </Chart>
        <Text style={styles.chartTitle}>{chartName}</Text>
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
                onPress={async () => {
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
                onPress={async () => {
                  setChartState(1);
                  updateButtonStyle(1);
                  await getReadingsByDay(7);
                  setXDomain({ min: 0, max: 7 });
                  setHorizontalTickValues(
                    [...Array(7).keys()].map((x) => x + 0.25)
                  );
                  setViewportWidth(7);
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
                onPress={async () => {
                  setChartState(2);
                  updateButtonStyle(2);
                  await getReadingsByDay(30);
                  setXDomain({ min: 0, max: 30 });
                  setHorizontalTickValues(
                    [...Array(30).keys()].map((x) => x + 0.25)
                  );
                  setViewportWidth(7);
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
              <View style={styles.deviceName}>
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
                    <Text style={styles.firstColumnText}>STATUS</Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      { backgroundColor: AppStyles.color.secondaryColor },
                    ]}
                  >
                    <Text style={styles.firstColumnText}>WORKING HOURS</Text>
                  </View>
                  <View style={[styles.cell]}>
                    <Text style={styles.firstColumnText}>CONSUMPTION</Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      { backgroundColor: AppStyles.color.secondaryColor },
                    ]}
                  >
                    <Text style={styles.firstColumnText}>FARM</Text>
                  </View>
                  <View style={[styles.cell]}>
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
                    {isOn && <Text>ON - for {4} hours</Text>}
                    {!isOn && (
                      <Text>
                        {/* Last active 2023/01/04 */}
                        {controlParameters.lastStatusChange
                          .split("T")[0]
                          .replace("-", "/")
                          .replace("-", "/")}
                      </Text>
                    )}
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
                    <Text>{workingHours}</Text>
                  </View>
                  <View
                    style={[
                      styles.cell,
                      {
                        borderRightWidth: 0,
                      },
                    ]}
                  >
                    <Text>{controlParameters.powerConsumption} [kW]</Text>
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
                    {farmName != null && <Text>{farmName.toUpperCase()}</Text>}
                    {farmName == null && <Text>{farmId}</Text>}
                  </View>
                  <View
                    style={[
                      styles.cell,
                      {
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

import React, { useState, useLayoutEffect, useEffect } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from "react-native-responsive-linechart";
import styles from "./styles";
import AppStyles from "../../AppStyles";

export default function HomeScreen({ navigation }) {
  const [production, setProduction] = useState(0);
  const [activeDevicesNum, setActiveDevicesNum] = useState(0);
  const [devicesNum, setDevicesNum] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);

  const [yLabels, setYLabels] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yDomain, setYDomain] = useState({ min: 0, max: 1.25 });
  const [xDomain, setXDomain] = useState({ min: 0, max: 7 });

  const [horizontalTickValues, setHorizontalTickValues] = useState([]);
  const [verticalTickValues, setVerticalTickValues] = useState([0, 1]);
  const [measurements, setMeasurements] = useState([{ x: 0, y: 0 }]);
  var dates = [];

  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 3, y: 0 },
    { x: 8, y: 1 },
    { x: 9, y: 0 },
    { x: 10, y: 1 },
  ];

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
      `https://smart-pv.herokuapp.com/management/farms/${farmId}/measurement/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      { method: "GET" }
    );
    const responseJson = await response.json();
    var responseEntries = Object.entries(responseJson);
    responseEntries.sort((a, b) => (a[0] > b[0] ? 1 : -1));

    for (let i = 1; i < responseEntries.length; i++) {
      if (responseEntries[i][1] != null) {
        var value = (responseEntries[i][1] / 1000).toFixed(2);
        tempData.push({ x: i, y: value });
        if (value > tempMaxY) tempMaxY = value;
        if (value < tempMinY) tempMinY = value;
      } else {
        tempData.push({ x: i, y: 0 });
      }
      if (i % 5 == 0) {
        dates.push(
          responseEntries[i][0].split("T")[1].split(":").slice(0, 2).join(":")
        );
        tempHorizontalValues.push(i);
      }
    }
    setMeasurements(tempData);
    // setMaxY(tempMaxY);
    // setMinY(tempMinY);
    setYLabels([...Array(11).keys()].map((i) => i * 10 + -50));
    setVerticalTickValues(
      [...Array(21).keys()].filter((x) => x % 2 == 0).map((i) => i * 10 + -100)
    );
    setXLabels(dates);
    setHorizontalTickValues(tempHorizontalValues);
    setXDomain({ min: 0, max: responseEntries.length });
    setYDomain({ min: -100, max: 100 });
  };

  const fetchData = async () => {
    try {
      const productionResponse = await fetch(
        `https://smart-pv.herokuapp.com/measurement/farms/${global.farmId}/statistics/sum`,
        { method: "GET" }
      );

      const production = await productionResponse.json();
      setProduction(production);

      const devicesResponse = await fetch(
        `https://smart-pv.herokuapp.com/management/farms/${global.farmId}/consumption/devices`,
        { method: "GET" }
      );
      var devicesRes = await devicesResponse.json();
      var hours = devicesRes.map((x) => x.workingHours).reduce((a, b) => a + b);

      setDevicesNum(devicesRes.length);
      setActiveDevicesNum(devicesRes.filter((x) => x.isOn).length);
      setWorkingHours(hours);
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };

  useLayoutEffect(() => {
    fetchData();
    getLastDayReadings();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#1C64BB"} />
      <View style={styles.upperContainer}>
        <View style={styles.upperSmall}>
          <TouchableOpacity
            style={styles.smallContainer}
            onPress={() => {
              navigation.navigate("ActiveDevices");
            }}
          >
            <View style={styles.circle}>
              <Text style={[styles.text, { fontSize: 40, fontWeight: "" }]}>
                {activeDevicesNum}
              </Text>
            </View>
            <View style={{ paddingTop: 8 }}>
              <Text style={[styles.text, { fontSize: 18, fontWeight: "" }]}>
                Active devices
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallContainer}
            onPress={() => {
              navigation.navigate("AllDevices");
            }}
          >
            <View style={styles.circle}>
              <Text style={[styles.text, { fontSize: 40, fontWeight: "" }]}>
                {devicesNum}
              </Text>
            </View>
            <View style={{ paddingTop: 8 }}>
              <Text style={[styles.text, { fontSize: 18, fontWeight: "" }]}>
                All devices
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.lowerSmall}>
          <View style={styles.longContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  styles.circle,
                  { height: 140, width: 140, borderRadius: 70 },
                ]}
              >
                <Text
                  style={[styles.text, { fontSize: 16, fontWeight: "600" }]}
                >
                  {(production / 1000).toFixed(2)} kWh
                </Text>
              </View>
              <View style={{ paddingTop: 8 }}>
                <Text style={[styles.text, { fontSize: 18, fontWeight: "" }]}>
                  Total production
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  styles.circle,
                  { height: 140, width: 140, borderRadius: 70 },
                ]}
              >
                <Text style={[styles.text, { fontSize: 30, fontWeight: "" }]}>
                  {workingHours}
                </Text>
              </View>
              <View style={{ paddingTop: 8 }}>
                <Text style={[styles.text, { fontSize: 18, fontWeight: "" }]}>
                  Total hours
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <Chart
          viewport={{ size: { width: 40 } }}
          style={styles.chart}
          xDomain={xDomain}
          yDomain={yDomain}
          padding={{ left: 25, top: 10, bottom: 30, right: 20 }}
        >
          <VerticalAxis
            tickValues={verticalTickValues}
            theme={{
              labels: {
                label: { fontSize: 8, fontWeight: "400" },
                formatter: (v) => v.toFixed(1),
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
                  return xLabels[Math.floor(v / 5) - 1];
                },
              },
            }}
          />
          {/* <Area
            theme={{
              gradient: {
                from: { color: AppStyles.color.primaryColor, opacity: 0.75 },
                to: { color: AppStyles.color.primaryColor, opacity: 0.1 },
              },
            }}
            data={measurements}
          /> */}
          <Line
            data={measurements}
            smoothing="none"
            theme={{
              stroke: { color: AppStyles.color.primaryColor, width: 1 },
            }}
          />
        </Chart>
        <Text style={styles.chartTitle}>Total measurements [kW]</Text>
      </View>
    </View>
  );
}

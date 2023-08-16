import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import MeasuringDeviceMin from "../../components/MeasuringDeviceMin/MeasuringDeviceMin";
import MeasuringDeviceMiniature from "../../components/MeasuringDeviceMiniature/MeasuringDeviceMiniature";
import styles from "./styles";

export default function MeasuringDeviceScreen({ navigation }) {
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {
    const devicesResponse = await fetch(
      `https://smart-pv.herokuapp.com/management/farms/${global.farmId}/measurement/devices`,
      { method: "GET" }
    );
    const devicesRes = await devicesResponse.json();

    setDevices(devicesRes);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 6 }} />
      <View style={styles.devicesList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={devices}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ paddingBottom: 17 }}
              onPress={() => {
                navigation.navigate("MeasuringDevice", item);
              }}
            >
              <MeasuringDeviceMin
                deviceName={item.name}
                deviceModel={item.deviceModel}
                production={item.measuredEnergy}
              />
            </TouchableOpacity>
          )}
          overScrollMode={"never"}
        />
      </View>
    </View>
  );
}

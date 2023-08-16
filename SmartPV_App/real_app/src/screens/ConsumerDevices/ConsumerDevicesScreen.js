import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import ConsumerDeviceMin from "../../components/ConsumerDeviceMin/ConsumerDeviceMin";
import styles from "./styles";

export default function ConsumerDevicesScreen({ navigation, onlyActive }) {
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {
    const devicesResponse = await fetch(
      `https://smart-pv.herokuapp.com/management/farms/${global.farmId}/consumption/devices`,
      { method: "GET" }
    );
    var devicesRes = await devicesResponse.json();

    if (onlyActive) {
      devicesRes = devicesRes.filter((x) => x.isOn);
    }
    setDevices(devicesRes);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {devices.length != 0 && (
        <FlatList
          style={{ paddingTop: 6 }}
          data={devices}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: "50%" }}
              onPress={() => {
                navigation.navigate("ConsumerDevice", item);
              }}
            >
              <ConsumerDeviceMin
                deviceStatus={item.isOn}
                deviceName={item.name}
                powerConsumption={item.controlParameters.powerConsumption}
                style={{}}
              />
            </TouchableOpacity>
          )}
          overScrollMode={"never"}
        />
      )}
      {devices.length == 0 && onlyActive && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, color: "#A2A2A2", paddingBottom: 100 }}>
            No active devices
          </Text>
        </View>
      )}
    </View>
  );
}

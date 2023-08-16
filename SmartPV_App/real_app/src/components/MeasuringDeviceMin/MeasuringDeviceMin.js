import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text } from "react-native";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default function MeasuringDeviceMin({
  deviceName,
  deviceModel,
  production,
}) {
  const renderStatus = () => {
    if (deviceStatus == "off") {
      return <View style={[styles.status, { backgroundColor: "lightgray" }]} />;
    }
    return <View style={[styles.status, { backgroundColor: "#48DA16" }]} />;
  };

  return (
    <View style={[styles.container, { overflow: "hidden" }]}>
      <View style={[styles.minorContainer]}>
        <Image
          style={styles.deviceIcon}
          source={require("../../../assets/temporaryMeter.png")}
        />
      </View>

      <LinearGradient
        style={{ flex: 2 }}
        colors={["#227BEA", "#459FF0"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View
          style={[
            styles.minorContainer,
            {
              flexDirection: "column",
              height: "100%",
              flex: 2.5,
            },
          ]}
        >
          <View style={{ flex: 5, justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              {(production / 1000).toFixed(2)} kWh
            </Text>
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={{ fontSize: 15, color: "white" }}>{deviceName}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

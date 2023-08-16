import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function ConsumerDeviceMin({
  deviceStatus,
  deviceName,
  powerConsumption,
}) {
  const renderStatus = () => {
    if (!deviceStatus) {
      return <View style={[styles.status, { backgroundColor: "lightgray" }]} />;
    }
    return <View style={[styles.status, { backgroundColor: "#48DA16" }]} />;
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}
    >
      <View style={styles.container}>
        <LinearGradient
          style={{ flex: 2, width: "100%", alignItems: "center" }}
          colors={["#227BEA", "#459FF0"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        >
          <Image
            style={styles.deviceIcon}
            source={require("../../../assets/temporaryMeter.png")}
          ></Image>
          <View style={styles.deviceInfo}>
            <Text style={{ fontSize: 15, textAlign: "center", color: "white" }}>
              {deviceName.length > 30
                ? deviceName.substr(0, 30) + "..."
                : deviceName}
            </Text>
            <Text style={{ fontSize: 20, paddingTop: 10, color: "white" }}>
              {powerConsumption} kWh
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.minorContainer}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {renderStatus()}
          </View>
        </View>
      </View>
    </View>
  );
}

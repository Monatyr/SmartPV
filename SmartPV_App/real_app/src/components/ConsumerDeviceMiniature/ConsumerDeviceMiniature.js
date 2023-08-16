import { Text, View, Image } from "react-native";
import styles from "./styles";

export default function ConsumerDeviceMiniature({
  powerConsumption,
  deviceStatus,
}) {
  return (
    <View style={styles.spaceBetween}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.deviceImage}
            source={require("../../../assets/ac-unit.webp")}
          ></Image>
        </View>
        <View style={styles.briefInfo}>
          <View style={{}}>
            <Text>Status: {deviceStatus}</Text>
          </View>
          <View>
            <Text>Power consum: {powerConsumption}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

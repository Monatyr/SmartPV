import { StyleSheet, Dimensions } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("screen").height * 0.277,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 9,
    borderColor: "#333",
    borderColor: "#d9d9d9",
    borderWidth: 1.5,
  },
  deviceInfo: {
    flex: 1,
    alignItems: "center",
  },
  deviceIcon: { width: 50, resizeMode: "contain", flex: 1 },
  minorContainer: {
    height: 45,
    alignItems: "center",
    width: "100%",
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
});

export default styles;

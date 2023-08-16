import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 110,
    width: "100%",
    borderColor: "black",
    borderColor: "#d9d9d9",
    borderWidth: 1.5,
    alignItems: "center",
    borderRadius: 9,
    backgroundColor: AppStyles.color.secondaryColor,
  },
  minorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  deviceIcon: { height: 50, width: 50, resizeMode: "contain", flex: 1 },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
});

export default styles;

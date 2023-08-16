import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    backgroundColor: AppStyles.color.primaryColor,
  },
  icon: {
    position: "absolute",
    left: 13,
    color: "white",
  },
  headerText: {
    fontSize: 23,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
});

export default styles;

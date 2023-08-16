import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#93A661",
    backgroundColor: AppStyles.color.primaryColor,
  },
  headerText: {
    fontSize: 23,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  icon: {
    position: "absolute",
    left: 20,
  },
});

export default styles;

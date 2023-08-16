import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  spaceBetween: {
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 0,
    padding: 10,
    borderRadius: 9,
    borderColor: "#333",
    borderWidth: 1,
  },
  imageContainer: {
    flex: 1,
    height: 130,
    width: 100,
    overflow: "hidden",
    borderRadius: 30,
  },
  deviceImage: {
    flex: 1,
    resizeMode: "contain",
  },
  briefInfo: {
    flex: 1,
    flexDirection: "row",
  },
});

export default styles;

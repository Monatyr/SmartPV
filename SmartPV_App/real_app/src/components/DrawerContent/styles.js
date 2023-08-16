import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
    paddingBottom: 12,
    paddingTop: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: "black",
  },
  profileText: {
    fontSize: 15,
    paddingTop: 10,
    color: "white",
  },
  settingsLabel: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 9,
    height: 40,
    position: "absolute",
    left: 10,
    bottom: 15,
    right: 10,
    backgroundColor: "#191919",
  },
  settingText: {
    paddingLeft: 25,
    fontSize: 14,
    color: "white",
  },
});

export default styles;

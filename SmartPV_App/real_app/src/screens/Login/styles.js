import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputField: {
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    paddingLeft: 10,
  },
  appLogo: {
    height: 130,
    width: 130,
    resizeMode: "contain",
  },
  appName: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  incorrectAuth: {
    height: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: AppStyles.color.primaryColor,
  },
});

export default styles;

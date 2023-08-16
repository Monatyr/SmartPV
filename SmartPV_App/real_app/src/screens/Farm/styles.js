import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  farmContainer: {
    marginTop: 20,
    width: "95%",
    height: 350,
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#d9d9d9",
    overflow: "hidden",
  },
  farmHeader: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  headerText: { fontSize: 20, fontWeight: "500" },
  farmInfo: { flex: 1, flexDirection: "row", backgroundColor: "#F5F5F5" },
  firstColumn: {
    flex: 1,
  },
  secondColumn: {
    flex: 1,
  },
  cell: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#989898",
  },
  firstColumnText: {
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;

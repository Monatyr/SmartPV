import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeStack from "./HomeStack";
import MeasuringDevicesStack from "./MeasuringDevicesStack";
import ConsumerDevicesStack from "./ConsumerDevicesStack";
import FarmStack from "./FarmStack";
import CustomDrawerContent from "../components/DrawerContent/DrawerContent";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const LeftDrawer = createDrawerNavigator();

function LeftDrawerScreen({ isSignedIn, setIsSignedIn, farmId }) {
  return (
    <LeftDrawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent props={props} setIsSignedIn={setIsSignedIn} />
      )}
      id="LeftDrawer"
      screenOptions={{
        drawerPosition: "left",
        headerShown: false,
        swipeEdgeWidth: 30,
        drawerStyle: {
          width: 251,
        },
        drawerLabelStyle: {
          color: "white",
        },
        drawerActiveBackgroundColor: "#227BEA",
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "#606060",
      }}
    >
      <LeftDrawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="home" size={30} style={{ color: "white" }} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Measuring Devices"
        component={MeasuringDevicesStack}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="bolt" size={30} style={{ color: "white" }} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Consumer Devices"
        component={ConsumerDevicesStack}
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="microwave"
              size={30}
              style={{ color: "white" }}
            />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Farm"
        component={FarmStack}
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="monitor"
              size={30}
              style={{ color: "white" }}
            />
          ),
        }}
      />
    </LeftDrawer.Navigator>
  );
}

export default LeftDrawerScreen;

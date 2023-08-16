import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DrawerHeader from "../components/DrawerHeader/DrawerHeader";
import StackHeader from "../components/StackHeader/StackHeader";
import React from "react";
import AppStyles from "../AppStyles";
import ConsumerDevicesScreen from "../screens/ConsumerDevices/ConsumerDevicesScreen";
import ConsumerDeviceScreen from "../screens/ConsumerDevice/ConsumerDeviceScreen";

const Stack = createStackNavigator();

export default function HomeStack({ farmId }) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: AppStyles.color.backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => (
            <DrawerHeader navigation={navigation} name="Home" />
          ),
        }}
      />
      <Stack.Screen
        name="ActiveDevices"
        options={{
          header: ({ navigation }) => (
            <StackHeader navigation={navigation} name="Active Devices" />
          ),
        }}
      >
        {(props) => <ConsumerDevicesScreen {...props} onlyActive={true} />}
      </Stack.Screen>
      <Stack.Screen
        name="AllDevices"
        options={{
          header: ({ navigation }) => (
            <StackHeader navigation={navigation} name="Consumer Devices" />
          ),
        }}
      >
        {(props) => <ConsumerDevicesScreen {...props} onlyActive={false} />}
      </Stack.Screen>
      <Stack.Screen
        name="ConsumerDevice"
        options={{
          header: ({ navigation }) => (
            <StackHeader navigation={navigation} name="Consumer Device" />
          ),
        }}
      >
        {(props) => <ConsumerDeviceScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

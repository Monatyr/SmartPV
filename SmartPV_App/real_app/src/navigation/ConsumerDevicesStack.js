import { createStackNavigator } from "@react-navigation/stack";
import ConsumerDevicesScreen from "../screens/ConsumerDevices/ConsumerDevicesScreen";
import ConsumerDeviceScreen from "../screens/ConsumerDevice/ConsumerDeviceScreen";
import DrawerHeader from "../components/DrawerHeader/DrawerHeader";
import StackHeader from "../components/StackHeader/StackHeader";
import React from "react";
import AppStyles from "../AppStyles";

const Stack = createStackNavigator();

export default function ConsumerDevicesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        screenOptions={{
          cardStyle: {
            backgroundColor: AppStyles.color.backgroundColor,
          },
        }}
        name="ConsumerDevicesScreen"
        options={{
          header: ({ navigation }) => (
            <DrawerHeader navigation={navigation} name="Consumer Devices" />
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

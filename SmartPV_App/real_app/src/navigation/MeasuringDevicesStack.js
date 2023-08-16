import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import MeasuringDevicesScreen from "../screens/MeasuringDevices/MeasuringDevicesScreen";
import MeasuringDeviceScreen from "../screens/MeasuringDevice/MeasuringDeviceScreen";
import DrawerHeader from "../components/DrawerHeader/DrawerHeader";
import StackHeader from "../components/StackHeader/StackHeader";
import AppStyles from "../AppStyles";

const Stack = createStackNavigator();

export default function MeasuringDevicesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: AppStyles.color.backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="MeasuringDevicesScreen"
        component={MeasuringDevicesScreen}
        options={{
          header: ({ navigation }) => (
            <DrawerHeader navigation={navigation} name="Measuring Devices" />
          ),
        }}
      />
      <Stack.Screen
        name="MeasuringDevice"
        options={{
          header: ({ navigation }) => (
            <StackHeader navigation={navigation} name="Measuring Device" />
          ),
        }}
      >
        {(props) => <MeasuringDeviceScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

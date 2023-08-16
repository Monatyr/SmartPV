import { createStackNavigator } from "@react-navigation/stack";
import DrawerHeader from "../components/DrawerHeader/DrawerHeader";
import StackHeader from "../components/StackHeader/StackHeader";
import React from "react";
import AppStyles from "../AppStyles";
import FarmScreen from "../screens/Farm/FarmScreen";

const Stack = createStackNavigator();

export default function FarmStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        screenOptions={{
          cardStyle: {
            backgroundColor: AppStyles.color.backgroundColor,
          },
        }}
        name="FarmScreen"
        component={FarmScreen}
        options={{
          header: ({ navigation }) => (
            <DrawerHeader navigation={navigation} name="Farm" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

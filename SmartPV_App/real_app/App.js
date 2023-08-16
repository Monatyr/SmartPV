import React, { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation/Drawer";

import LoginScreen from "./src/screens/Login/LoginScreen";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <NavigationContainer>
      {isSignedIn && (
        <Navigator isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      )}
      {!isSignedIn && <LoginScreen setIsSignedIn={setIsSignedIn} />}
    </NavigationContainer>
  );
}

registerRootComponent(App);

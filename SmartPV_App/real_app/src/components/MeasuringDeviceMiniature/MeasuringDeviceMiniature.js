import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

export default function MeasuringDeviceMiniature({ deviceName, deviceStatus }) {
  return (
    <View style={styles.spaceBetween}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.deviceImage}
            source={require("../../../assets/ac-unit.webp")}
          ></Image>
        </View>
        <View style={styles.briefInfo}>
          <View>
            <Text>Name: {deviceName}</Text>
          </View>
          <View style={{}}>
            <Text>Status: {deviceStatus}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

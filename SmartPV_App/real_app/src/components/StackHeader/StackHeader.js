import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

export default function StackHeader({ navigation, name }) {
  return (
    <View style={styles.header}>
      <LinearGradient
        style={styles.header}
        colors={["#227BEA", "#459FF0"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <TouchableOpacity
          style={[styles.icon]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="chevron-left"
            size={32}
            style={{ color: "white" }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
      </LinearGradient>
    </View>
  );
}

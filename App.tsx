import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes/";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <StatusBar style="auto" />
    </View>
  );
}

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { dbInit } from "./helpers/database/db";
import Home from "./HomeScreen";
import Checkout from "./CheckoutScreen";
import Confirmation from "./ConfirmationScreen";
import HomeScreen from "./HomeScreen";
import CheckoutScreen from "./CheckoutScreen";

// Call Database Init
dbInit()
  .then((res) => {
    console.log("Database initialization completed");
  })
  .catch((err) => {
    console.log("Database initialization failed");
    console.log(err);
  });

export default function App() {
  return <Home />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

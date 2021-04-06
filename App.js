import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { dbInit } from "./helpers/database/db";
import Home from "./HomeScreen";
import Checkout from "./CheckoutScreen";
import Confirmation from "./ConfirmationScreen";
import HomeScreen from "./HomeScreen";
import CheckoutScreen from "./CheckoutScreen";
import React,{useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import AppNavigator from "./navigation/AppNavigator";
import {dbInit} from "./helpers/db";

enableScreens();

// Fonts - Fetch and Load
const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};


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
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <AppNavigator />
    );
}

// 101303562 | Matheus Hanssen |
// 101260567 | Mohammad Jamshed Qureshi |

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { icons, SIZES, COLORS, FONTS } from "../../constants";

export const ConfirmationScreen = () => {
  /*
   * @TODO use navigator to go to home screen
   */
  function backToHome() {}

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/confirmation.png")}
      />

      <Text style={styles.orderPlaced}>Your order has been placed!</Text>
      <TouchableOpacity onPress={backToHome()} style={[styles.button]}>
        <Text style={styles.text}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

ConfirmationScreen.navigationOptions = {
  headerTitle: 'Confirmation'
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderPlaced: {
    fontSize: 25,
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    marginTop: 120,
  },
  button: {
    display: "flex",
    marginTop: 30,
    height: 50,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
});

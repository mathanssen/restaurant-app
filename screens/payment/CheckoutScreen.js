import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  LogBox,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { dbInit } from "../../helpers/db";
import { insertCustomerOrder, fetchCustomerOrders } from "../../helpers/db";
import { CreditCardInput } from "react-native-credit-card-input";
import { icons, SIZES, COLORS, FONTS } from "../../constants";

export const CheckoutScreen = (props) => {
  // Settings
  LogBox.ignoreAllLogs();

  // Call Database Init
  dbInit()
    .then((res) => {
      console.log("Database initialization completed");
    })
    .catch((err) => {
      console.log("Database initialization failed");
      console.log(err);
    });

  // States
  const [name, setName] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [billingAddress, setBillingAddress] = React.useState(null);
  const [shippingAddress, setShippingAddress] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [subtotalAmount, setSubtotalAmount] = React.useState(0);
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [cardNumber, setCardNumber] = React.useState(null);
  const [cvc, setCvc] = React.useState(null);
  const [expiryDate, setExpiryDate] = React.useState(null);

  // Insert order
  const insertOrderHandler = async () => {
    try {
      const dbResult = await insertCustomerOrder(
        email,
        name,
        billingAddress,
        shippingAddress,
        subtotalAmount,
        discountPercent
      );

      if (dbResult.rowsAffected !== 1) {
        console.log(
          `insertCustomerOrder : dbResult.rowsAffected : ${dbResult.rowsAffected}`
        );
      }
    } catch (err) {
      console.log(`insertCustomerOrder : dbResult.rowsAffected : ${err}`);
    }
  };

  // Fetch Order
  const fetchCustomerOrdersHandler = async () => {
    try {
      const dbResult = await fetchCustomerOrders("mathanssen@gmail.com");

      if (dbResult.rowsAffected !== 1) {
        console.log(
          `insertCustomerOrder : dbResult.rowsAffected : ${dbResult.rowsAffected}`
        );
      }
    } catch (err) {
      console.log(`insertCustomerOrder : dbResult.rowsAffected : ${err}`);
    }
  };

  /*
   * @TODO cancel and go back to home screen
   */
  function cancelPressed() {}

  // Confirm order and go to confirmation screen
  function confirmPressed() {
    // Check it is all filled
    if (
      name == null ||
      phone == null ||
      email == null ||
      billingAddress == null ||
      shippingAddress == null ||
      cvc == null ||
      cardNumber == null ||
      expiryDate == null
    ) {
      Alert.alert("Attention", "Please, fill all of the fields", [
        { text: "OK" },
      ]);
    } else {
      // Check if phone number and email exist
      errors = "";
      let emailExists = emailIsValid(email);
      let phoneExists = phoneNumberIsValid(phone);
      if (emailExists == false) {
        errors += "Email is not valid" + "\n";
      }
      if (phoneExists == false) {
        errors += "Phone Number is not valid" + "\n";
      }
      if (errors == "") {
        // If it is all right, add order to database
        insertOrderHandler;
      } else {
        Alert.alert("Attention", errors, [{ text: "OK" }]);
      }
    }
  }

  // Check if phone number is valid
  function phoneNumberIsValid(phoneNumber) {
    let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (re.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

  // Check if email is valid
  function emailIsValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // View
  return (
    <View style={styles.container}>
      <Text>This is {route.params.test}'s profile</Text>;
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
        style={styles.input}
        maxLength={10}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Billing Address"
        value={billingAddress}
        onChangeText={setBillingAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Shipping Address"
        value={shippingAddress}
        onChangeText={setShippingAddress}
        style={styles.input}
      />
      <CreditCardInput
        onChange={(form) => {
          setCardNumber(form.values.number);
          setCvc(form.values.cvc);
          setExpiryDate(form.values.expiry);
        }}
        allowScroll={true}
        additionalInputsProps={{
          number: {
            maxLength: 19,
          },
        }}
        cardScale={1}
        inputContainerStyle={styles.cardInput}
      />
      <View style={[styles.containerButton]}>
        <TouchableOpacity
          onPress={() => {
            confirmPressed();
          }}
          style={[styles.button]}
        >
          <Text style={[styles.text]}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            cancelPressed();
          }}
          style={[styles.buttonCancel]}
        >
          <Text style={[styles.text]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Navigation Settings
CheckoutScreen.navigationOptions = {
  headerTitle: "Checkout",
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    marginTop: 40,
    paddingHorizontal: 24,
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  containerName: {
    width: "50%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    padding: 15,
  },
  input: {
    borderColor: "#f0f0f0",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    margin: 10,
    padding: 5,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 15,
  },
  itemFlex: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 18,
    paddingHorizontal: 5,
  },
  icons: {
    height: 20,
    width: 20,
  },
  button: {
    display: "flex",
    margin: 20,
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
  buttonCancel: {
    display: "flex",
    margin: 20,
    height: 50,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
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

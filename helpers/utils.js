// 101303562 | Matheus Hanssen |
// 101260567 | Mohammad Jamshed Qureshi |

// Check if phone number is valid
import {Alert} from "react-native";

export function phoneNumberIsValid(phoneNumber) {
  let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (re.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

// Check if email is valid
export function emailIsValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

// showAlert
export const showAlert = (title, message) => {
  Alert.alert(
      title,
      message,
      [{text: 'OK'}]
  );
};


// Category Array
export const categoryData = [
  { label: "All", value: "" },
  { label: "Italian", value: "Italian" },
  { label: "North American", value: "North American" },
  { label: "Meditterranean", value: "Meditterranean" },
  { label: "Indian", value: "Indian" },
  { label: "Dessert", value: "Dessert" },
  { label: "Mexican", value: "Mexican" },
  { label: "Soup", value: "Soup" },
  { label: "Hot Beverage", value: "Hot Beverage" },
  { label: "Middle eastern food", value: "Middle eastern food" },
  { label: "Persian", value: "Persian" },
  { label: "Japanese", value: "Japanese" },
  { label: "Others", value: "Others" },
];

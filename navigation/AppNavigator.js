import React from "react";
import { Platform, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// Drawer
import { DrawerContent } from "./DrawerContent";

// User Screens
import { UserProfileScreen } from "../screens/userprofile/UserProfileScreen";
import { SettingsScreen } from "../screens/userprofile/SettingsScreen";
import { DBTestScreen } from "../screens/test/DBTestScreen";

// Auth Screens
import { SignInScreen } from "../screens/auth/SignInScreen";
import { SignupScreen } from "../screens/auth/SignupScreen";

// Store Screens
import { MealsCategoriesScreen } from "../screens/meals/MealsCategoriesScreen";
import { FavouritesScreen } from "../screens/favourites/FavouritesScreen";
import { HomeScreen } from "../screens/meals/HomeScreen";

// Orders Screen
import { OrdersScreen } from "../screens/orders/OrdersScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "DefaultScreen",
};

const AuthNavigator = createStackNavigator(
  {
    Signin: {
      screen: SignInScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const UserProfileNavigator = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfileScreen,
    },
    DBTestScripts: {
      screen: DBTestScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const StoreNavigator = createStackNavigator(
  {
    MealCategories: {
      screen: MealsCategoriesScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Favourites Stack Navigator
const FavouritesNavigator = createStackNavigator(
  {
    Favourites: {
      screen: FavouritesScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Orders Stack Navigator
const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Store: {
    screen: StoreNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favourites: {
    screen: FavouritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text>
        ) : (
          "Favourites"
        ),
    },
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="receipt-outline"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Orders</Text>
        ) : (
          "Orders"
        ),
    },
  },
  Profile: {
    screen: UserProfileNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="person-circle" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Profile</Text>
        ) : (
          "Profile"
        ),
    },
  },
};

const SettingsNavigator = createStackNavigator(
  {
    Filters: {
      screen: SettingsScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Tab Navigator
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans",
          },
          activeTintColor: Colors.accentColor,
        },
      });

// Drawer Navigator
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Profile: {
      screen: SettingsNavigator,
      navigationOptions: {
        drawerLabel: "Profile",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
    // contentComponent: DrawerContent,
  }
);

const MainSwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Store: MainNavigator,
  Payment: PaymentNavigator,
});

export default createAppContainer(MainSwitchNavigator);

import React from 'react';
import {Platform, Text} from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {UserProfileScreen} from "../screens/user/UserProfileScreen";
import {SignInScreen} from "../screens/user/SignInScreen";
import {SignupScreen} from "../screens/user/SignupScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'Screen',
};


const StoreNavigator = createStackNavigator({
    UserProfile: {
        screen: UserProfileScreen,
    },
}, {
    defaultNavigationOptions: defaultStackNavOptions,
});


const AuthNavigator = createStackNavigator({
    Signin: {
        screen: SignInScreen
    },
    Signup: {
        screen: SignupScreen
    },
}, {defaultNavigationOptions: defaultStackNavOptions});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Store: StoreNavigator,
});

export default createAppContainer(MainNavigator);

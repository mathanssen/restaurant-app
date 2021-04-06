import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {CustomHeaderButton} from "../../components/HeaderButton";


export const SettingsScreen = (props) => {
    return (
        <View>
            <Text>Settings Screen</Text>
        </View>
    );
};

SettingsScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Settings',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({});


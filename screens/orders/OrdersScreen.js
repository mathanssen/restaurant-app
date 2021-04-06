import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {CustomHeaderButton} from "../../components/HeaderButton";

export const OrdersScreen = (props) => {
    return (
        <View>
            <Text>Orders Screen</Text>
        </View>
    );
};

OrdersScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Orders',
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


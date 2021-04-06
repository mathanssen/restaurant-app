import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {CustomHeaderButton} from "../../components/HeaderButton";

export const MealsCategoriesScreen = (props) => {
    return (
        <View>
            <Text>Meals Categories Screen</Text>
        </View>
    );
};

MealsCategoriesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Meals',
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


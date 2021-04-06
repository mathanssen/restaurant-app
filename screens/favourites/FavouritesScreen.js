import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/HeaderButton";

export const FavouritesScreen = (props) => {
    return (
        <View>
            <Text>FavouritesScreen</Text>
        </View>
    );
};

FavouritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Favourites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>
        )
    }
};


const styles = StyleSheet.create({

});


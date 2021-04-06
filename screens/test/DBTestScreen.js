import React from "react";
import {View, Text, Button} from 'react-native';
import {insertCustomerOrder, fetchCustomerOrders} from "../../helpers/db";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../../components/HeaderButton";


export const DBTestScreen = () => {

    const TestInsertOrderHandler = async () => {

        try {
            const dbResult = await insertCustomerOrder('test1@gmail.com', 'Test Man', 'My Billing Address', 'My shipping address',100, 10)

            if (dbResult.rowsAffected !== 1) {
                console.log(`insertCustomerOrder : dbResult.rowsAffected : ${dbResult.rowsAffected}`)
            }
        } catch (err) {
            console.log(`insertCustomerOrder : dbResult.rowsAffected : ${err}`)
        }

    }
    const fetchCustomerOrdersHandler = async () => {

        try {
            const dbResult = await fetchCustomerOrders('test1@gmail.com')

            if (dbResult.rowsAffected !== 1) {
                console.log(`insertCustomerOrder : dbResult.rowsAffected : ${dbResult.rowsAffected}`)
            }
        } catch (err) {
            console.log(`insertCustomerOrder : dbResult.rowsAffected : ${err}`)
        }

    }


    return (
        <View>
            <Button title="Test Insert Order" onPress={TestInsertOrderHandler} />
            <Button title="Fetch Customer Orders" onPress={fetchCustomerOrdersHandler} />

        </View>
    );

};

DBTestScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Debug',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>
        )
    }
};

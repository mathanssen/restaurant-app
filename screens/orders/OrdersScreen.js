import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {StyleSheet, FlatList, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {CustomHeaderButton} from "../../components/HeaderButton";
import {OrderItem} from "../../components/OrderItem";
import {fetchCustomerOrders, fetchOrders} from "../../helpers/db";


export const OrdersScreen = (props) => {

    const authInfo = useSelector(state => state.restaurant.authInfo)[0];

    const [email, setEmail] = useState(authInfo.userEmail);
    const [isLoggedIn, setIsLoggedIn] = useState(authInfo.isLoggedIn);
    const [ordersData, setOrdersData] = useState();

    useEffect(() => {

        console.log('calling fetch data');

        fetchCustomerOrdersData();

    },[]);


    const fetchCustomerOrdersData = async () => {

        try {
            const dbResult = await fetchOrders();

            console.log(dbResult.rows.length)

            if (dbResult.rows.length > 0) {

                setOrdersData(dbResult.rows._array);
                console.log(dbResult.rows._array)
                // console.log(dbResult.rows._array[0].name)
            };

        } catch (err) {
            Alert.alert(
                'DataFetch Failed!',
                `${err}`,
                [{text: 'OK'}]
            );
            console.log(err);
        }
    }

    return (

        <FlatList
            data={ordersData}
            keyExtractor={item => item.order_id.toString()}
            renderItem={itemData => (
                <OrderItem
                    email={itemData.item.customer_id}
                    orderdate={itemData.item.order_date}
                    subtotal={itemData.item.subtotal_amount} />
            )}
        />
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


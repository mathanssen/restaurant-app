import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

export const OrderItem = props => {
    console.log(props)


    return (
        <TouchableOpacity style={styles.orderItem} onPress={props.onSelect} >
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.email}</Text>
                <Text style={styles.title}>${props.subtotal}</Text>
                <Text style={styles.title}>{props.orderdate}</Text>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'blue',
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    address: {
        color: '#666',
        fontSize: 16,
    },
});

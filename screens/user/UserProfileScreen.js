import React, {useState, useEffect} from "react";
import {View, Text, Button, KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, Alert} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import {SignupScreen} from "./SignupScreen";
import {fetchCustomer, deleteCustomer, updateCustomer} from "../../helpers/db";

export const UserProfileScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressLat, setAddressLat] = useState(0);
    const [addressLng, setAddressLng] = useState(0);

    const customerEmail = props.navigation.getParam('customerEmail');
    const [isLoggedIn, setIsLoggedIn] = useState(props.navigation.getParam('isLoggedIn'));

    const dbTestScriptHandler = () => {
        props.navigation.navigate('DBTestScripts')
    }

    const navigateToSignin = () => {
        props.navigation.navigate({
            routeName: 'Signin',
            params: {
                isLoggedIn: false,
            }
        });
    };

    useEffect(() => {

        fetchCustomerData();

        if (!isLoggedIn) {
            console.log('moving....')
            navigateToSignin();
        }

    },[isLoggedIn]);

    const fetchCustomerData = async () => {

        let accountExists = false;

        try {
            const dbResult = await fetchCustomer(customerEmail);

            if (dbResult.rows.length === 1) {
                accountExists = true;
                setEmail(dbResult.rows._array[0].email);
                setPassword(dbResult.rows._array[0].password);
                setName(dbResult.rows._array[0].email);
                setPhone(dbResult.rows._array[0].phone);
                setAddress(dbResult.rows._array[0].address);
                setAddressLat(dbResult.rows._array[0].address_lat);
                setAddressLng(dbResult.rows._array[0].address_lng);

                console.log(dbResult)
                console.log(dbResult.rows._array[0].name)
            };

        } catch (err) {
            Alert.alert(
                'Signup Failed!',
                'Please try again later!',
                [{text: 'OK'}]
            );
            console.log(err);
        }

        // Account Not Exists - inform user to try again
        if (!accountExists) {
            Alert.alert(
                'Account Error!',
                'Invalid email address.',
                [{text: 'OK'}]
            );
            // Navigate to signin
            navigateToSignin();
            return;
        }

    }

    const deleteAccountHandler = async () => {

        try {
            const dbResult = await deleteCustomer(email);
        } catch (err) {
            Alert.alert(
                'Account Deleted Failed!',
                `Failed to remove account. ${err}`
                    [{text: 'OK'}]
            );
            return;
        }

        Alert.alert(
            'Account Deleted!',
            'Account deleted successfully.',
            [{text: 'OK'}]
        );

        // Navigate back to signin screen
        navigateToSignin();

    }

    const updateProfileHandler = async () => {
        try {
            const dbResult = await updateCustomer(email, password, name, phone, address, addressLat, addressLng);

        } catch (err) {
            Alert.alert(
                'Account Deleted Failed!',
                `Failed to remove account. ${err}`
                [{text: 'OK'}]
            );

            return;
        }

        Alert.alert(
            'Profile Updated!',
            'Profile details updated successfully.',
            [{text: 'OK'}]
        );

    };

    const emailChangeHandler = text => {
        setEmail(text);
    };

    return (
        <KeyboardAvoidingView behaviour='padding' keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#cc9900', '#ff99cc']} style={styles.gradient}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.formControl}>

                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={emailChangeHandler}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                keyboardType='default'
                                secureTextEntry
                                autoCapitalize='none'
                            />
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={setAddress}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                            <View style={styles.buttonContainer}>
                                <Button title="Update Profile" color={Colors.accentColor} onPress={updateProfileHandler}/>
                            </View>
                            <View style={styles.buttonContainer} onPress={updateProfileHandler}>
                                <Button title="Back to Login" color={Colors.accentColor} onPress={navigateToSignin}/>
                            </View>

                            <View style={styles.buttonContainer} onPress={updateProfileHandler}>
                                <Button title="Delete Account" color={Colors.accentColor} onPress={deleteAccountHandler}/>
                            </View>


                            <View style={styles.buttonContainer} onPress={updateProfileHandler}>
                                <Button title="DB Test Scripts" color={Colors.accentColor} onPress={dbTestScriptHandler}/>
                            </View>


                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );

};

UserProfileScreen.navigationOptions = {
    headerTitle: 'User Profile'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width:'90%',
        maxWidth: 400,
        maxHeight: '100%',
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    buttonContainer: {
        marginTop: 10,
    },
});

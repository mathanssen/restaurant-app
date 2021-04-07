import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text, TextInput, Button,KeyboardAvoidingView, Alert, ActivityIndicator} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import {SignInScreen} from "./SignInScreen";
import {fetchCustomer, insertCustomer} from "../../helpers/db";
import {phoneNumberIsValid, emailIsValid, showAlert} from '../../helpers/utils'

export const SignupScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressLat, setAddressLat] = useState(0);
    const [addressLng, setAddressLng] = useState(0);


    const emailChangeHandler = text => {
        setEmail(text);
    };

    const navigateToSignin = () => {
        props.navigation.navigate('Signin');
    };

    const signupHandler = async () => {

        // Name
        if (name.length <= 0) {
            showAlert('Invalid Name', 'Please enter a Name');
            return;
        }

        // emailIsValid
        if (!emailIsValid(email)) {
            showAlert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        // Password
        if (password.length <= 0) {
            showAlert('Invalid Password', 'Please enter a valid password');
            return;
        }

        // Phone
        if (!phoneNumberIsValid(phone)) {
            showAlert('Invalid Phone Number', 'Please enter a valid phone number');
            return;
        }

        // Address
        if (address.length <= 0) {
            showAlert('Invalid Address', 'Please enter a valid address');
            return;
        }




        let accountExists = false;

        try {
            const dbResult = await fetchCustomer(email);

            if (dbResult.rows.length === 1) {
                accountExists = true;
            };

        } catch (err) {
            Alert.alert(
                'Signup Failed!',
                'Please try again later!',
                [{text: 'OK'}]
            );
            console.log(err);
        }

        // Account Exists - inform user to try again
        if (accountExists) {

            Alert.alert(
                'Signup Failed!',
                'Email is not available, please try a different email.',
                [{text: 'OK'}]
            );
            setPassword();
            return;
        }

        // Create New Account
        try {
            const dbResult = await insertCustomer(email, password, name, phone, address, addressLat, addressLng);

            if (dbResult.rowsAffected !== 1) {
                setPassword();
                Alert.alert(
                    'Failed to create Account!',
                    'Please try a again later',
                    [{text: 'OK'}]
                );
                return;
            }

            // Update state and inform user
            Alert.alert(
                'Account Created',
                'Account created successfully',
                [{text: 'OK'}]
            );

            navigateToSignin();

        } catch (err) {
            Alert.alert(
                `Failed to create Account!`,
                `Please try a again later ${err}`,
                [{text: 'OK'}]
            );
            setPassword();
            return
        }


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
                                <Button title="Sign-Up" color={Colors.accentColor} onPress={signupHandler}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Back to Login" color={Colors.primaryColor} onPress={navigateToSignin}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );

};

SignupScreen.navigationOptions = {
    headerTitle: 'New SignUp'
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
        maxHeight: 600,
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



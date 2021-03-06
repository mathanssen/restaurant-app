import React,{useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView, StyleSheet, View, Text, TextInput, Button,KeyboardAvoidingView, Alert, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Colors from "../../constants/Colors";
import {loginCustomer} from "../../helpers/db";
import {authInfoSet} from "../../store/actions/restaurant";
import {emailIsValid, showAlert} from '../../helpers/utils'

export const SignInScreen = (props) => {

    const authInfo = useSelector(state => state.restaurant.authInfo)[0];
    const [isLoggedIn, setIsLoggedIn] = useState(authInfo.isLoggedIn);
    const [email, setEmail] = useState(authInfo.userEmail);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redux Dispatch to call actions
    const dispatch = useDispatch();

    const navigateToAppHomeScreen = () => {
        props.navigation.navigate({
            routeName: 'MealCategories',
            params: {
                customerEmail: email,
                isLoggedIn: true,
            }
        });
    };

    useEffect(() => {

        if (isLoggedIn && email) {
            navigateToAppHomeScreen();
        };

    },[isLoggedIn]);

    const emailChangeHandler = text => {
        setEmail(text);
    };

    const loginHandler = async () => {

        // emailIsValid
        if (!emailIsValid(email)) {
            showAlert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        // Password
        if (password.length <= 0) {
            showAlert('Empty Password', 'Please enter a valid password');
            return;
        }

        setIsLoading(true)
        let loginStatus = false;

        try {
            const dbResult = await loginCustomer(email, password);

            if (dbResult.rows.length === Number(1)) {
                loginStatus = true;

                dispatch(authInfoSet(dbResult.rows._array[0].email,true));
                setEmail(dbResult.rows._array[0].email);
                setIsLoggedIn(true);


            };

        } catch (err) {
            loginStatus = false;
            console.log(err)
        }

        // LoggedIn Failed
        if (!loginStatus) {
            Alert.alert(
                'Login Failed!',
                'Please check email and password and try again, !',
                [{text: 'OK'}]
            );
            setPassword();
            setIsLoading(false)
            return;
        }

        setIsLoading(false)
        return;
    }

    const signupHandler = async () => {
        props.navigation.navigate('Signup');
    }

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
                        errorMessage="Please enter a valid email address."
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        keyboardType='default'
                        secureTextEntry
                        autoCapitalize='none'
                        errorMessage="Please enter a valid password."
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Login" color={Colors.primaryColor} onPress={loginHandler}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Sign-Up" color={Colors.accentColor} onPress={signupHandler}/>
                    </View>


                </View>
                </ScrollView>
            </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

SignInScreen.navigationOptions = {
    headerTitle: 'Login'
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
        width:'80%',
        maxWidth: 400,
        maxHeight: 400,
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



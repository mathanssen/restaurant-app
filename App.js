import React,{useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import AppNavigator from "./navigation/AppNavigator";
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import {dbInit} from "./helpers/db";
import {restaurantReducer} from "./store/reducers/restaurant";


enableScreens();

// Initialize Store
const rootReducer = combineReducers({
    restaurant: restaurantReducer
})
const store = createStore(rootReducer);

// Fonts - Fetch and Load
const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};


// Call Database Init
dbInit().then((res) => {
    console.log('Database initialization completed');
}).catch(err => {
    console.log('Database initialization failed');
    console.log(err);
});


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}

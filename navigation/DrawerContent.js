import React from "react";
import {Text, View, StyleSheet} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';

// export const DrawerContent = (props) => {
//     return (
//         <View><Text>Option 1</Text></View>
//     )
// }

const DrawerContent = (props) => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

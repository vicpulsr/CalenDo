import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export type RootTabsParamList = {
    Sign: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootTabsParamList { }
    }
};

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Splash"
                component={Splash}
            />
            
            <Screen
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    );
};
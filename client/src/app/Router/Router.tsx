import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SwordsScreen } from '../../screens/Swords';
import { ShieldsScreen } from '../../screens/Shields';
import { BottomTabParams, Routes, SwordStackParams, ShieldStackParams } from './Router.types';

const SwordsNav = createStackNavigator<SwordStackParams>();
const SwordsStack = () => {
    return (
        <SwordsNav.Navigator>
            <SwordsNav.Screen
                name={Routes.Swords}
                options={{ headerTitle: 'Swords' }}
                component={SwordsScreen}
            />
        </SwordsNav.Navigator>
    );
};

const ShieldsNav = createStackNavigator<ShieldStackParams>();
const ShieldsStack = () => {
    return (
        <ShieldsNav.Navigator>
            <ShieldsNav.Screen
                name={Routes.Shields}
                options={{ headerTitle: 'Shields' }}
                component={ShieldsScreen}
            />
        </ShieldsNav.Navigator>
    );
};

const HomeNav = createBottomTabNavigator<BottomTabParams>();
const HomeTabs = () => {
    return (
        <HomeNav.Navigator>
            <HomeNav.Screen
                name={Routes.Swords}
                options={{ tabBarLabel: "Swords" }}
                component={SwordsStack}
            />
            <HomeNav.Screen
                name={Routes.Shields}
                options={{ tabBarLabel: "Shields" }}
                component={ShieldsStack}
            />
        </HomeNav.Navigator>
    );
};

export const Router = () => {

    return (
        <NavigationContainer>
            <HomeTabs />
        </NavigationContainer>
    );
};

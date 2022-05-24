import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddNewTask } from '../screens/AddNewTask';
import { Tasks } from '../screens/Tasks';

const { Navigator, Screen } = createBottomTabNavigator();

export type RootTabsParamList = {
    Tarefas: undefined;
    AdicionarTarefa: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootTabsParamList { }
    }
};

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.secondary,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >           
            <Screen
                name="Adicionar tarefa"
                component={AddNewTask}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name='add'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Tarefas"
                component={Tasks}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
};
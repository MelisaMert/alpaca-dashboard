import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screen/DashboardScreen';
import SearchScreen from './screen/SearchScreen';
import SettingsScreen from './screen/SettingsScreen';
import StocksScreen from './screen/StocksScreen';

function HomeScreen() {
  return (
    <DashboardScreen />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons name="ios-speedometer" color="gray" size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="Stocks"
          component={StocksScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons name="ios-pulse" color="gray" size={25} />
            ),
          }}
        />


        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons name="ios-options" color="gray" size={25} />
            ),
          }}
        />


        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: (props) => (
              <Ionicons name="ios-search" color="gray" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
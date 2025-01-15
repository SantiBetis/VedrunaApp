import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddScreen } from './AddScreen';
import { SettingsScreen } from './SettingsScreen';
import { PublicacionesScreen } from './PublicacionesScreen';

const Tab = createBottomTabNavigator();

export function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/img/logo-vedruna.png')} 
        style={styles.logo}
      />
      <Text style={styles.text}>VEDRUNA</Text>
    </View>
  );
}
export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true, 
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#9FC63B",
        tabBarInactiveTintColor: "#868686",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Publicaciones"
        component={PublicacionesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23272A',
    paddingVertical: 10,
  },
  logo: {
    width: 50, 
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DFDFDF',
  },
  tabBar: {
    backgroundColor: '#23272A',
    height: 75,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12, 
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;

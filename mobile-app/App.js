import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Home, User, GraduationCap, Briefcase, LayoutDashboard, Building } from 'lucide-react-native';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import JobsScreen from './src/screens/JobsScreen';
import StudentDashboardScreen from './src/screens/StudentDashboardScreen';
import TeacherDashboardScreen from './src/screens/TeacherDashboardScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import UniversityDashboardScreen from './src/screens/UniversityDashboardScreen';
import { COLORS } from './src/constants/Theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = ({ route }) => {
  const { role = 'guest' } = route.params || {};
  const isLoggedIn = role !== 'guest';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 90 : 75,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '800' },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Asosiy') return <Home size={22} color={color} />;
          if (route.name === 'Profil') return <User size={22} color={color} />;
          if (route.name === 'Talaba') return <GraduationCap size={22} color={color} />;
          if (route.name === 'Ustoz') return <Briefcase size={22} color={color} />;
          if (route.name === 'Admin') return <LayoutDashboard size={22} color={color} />;
          if (route.name === 'OTM') return <Building size={22} color={color} />;
          return <Home size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Asosiy" component={HomeScreen} initialParams={{ role }} />
      
      {role === 'student' && <Tab.Screen name="Talaba" component={StudentDashboardScreen} />}
      {role === 'teacher' && <Tab.Screen name="Ustoz" component={TeacherDashboardScreen} />}
      {role === 'university' && <Tab.Screen name="OTM" component={UniversityDashboardScreen} />}
      {role === 'admin' && <Tab.Screen name="Admin" component={AdminDashboardScreen} />}
      
      <Tab.Screen 
        name="Profil" 
        component={isLoggedIn ? ProfileScreen : LoginScreen} 
        initialParams={{ role }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.bgDark }
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Jobs" component={JobsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  }
});

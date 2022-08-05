import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components/index';
import NewPasswordScreen from '../screens/AuthScreens/ForgotPasswordFlow/NewPasswordScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen/SignUpScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordFlow/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/AuthScreens/ConfirmEmailScreen/ConfirmEmailScreen';
import WorkoutQuestionsScreen from '../screens/AuthScreens/WorkoutQuestionsScreen/WorkoutQuestionsScreen';
import HomeScreen from '../screens/MainScreens/HomeScreen/HomeScreen';
import WorkoutScreen from '../screens/MainScreens/WorkoutScreen/WorkoutScreen';
import ProfileScreen from '../screens/MainScreens/ProfileScreen/ProfileScreen';
import StartScreen from '../screens/StartScreen/StartScreen';
import GenerateWorkoutLoadingScreen from '../screens/AuthScreens/GenerateWorkoutLoadingScreen/GenerateWorkoutLoadingScreen';

const Router: React.FC = () => {
  const Tab = createBottomTabNavigator();

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen
          name="ConfirmEmailScreen"
          component={ConfirmEmailScreen}
        />
        <Stack.Screen
          name="WorkoutQuestionsScreen"
          component={WorkoutQuestionsScreen}
        />
        <Stack.Screen
          name="GenerateWorkoutLoadingScreen"
          component={GenerateWorkoutLoadingScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeTabs} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Router;

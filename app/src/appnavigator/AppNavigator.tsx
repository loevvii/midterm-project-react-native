import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './src/context/globalContext';
import Index from '../screens/home';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: (props) => <Header {...props} />,
        // }}
      >
        <Stack.Screen
          name="empleyo"
          component={Login}
          options={{ headerBackVisible: true }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobalContext } from '../context/globalContext'; // Import the global context hook
import Index from '../screens/home';
import Login from '../screens/login';
import BookmarkedJobs from '../screens/bookmarks'; // Import the BookmarkedJobs screen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme } = useGlobalContext(); // Access the theme from global context

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Ensure headers are shown by default
        headerStyle: {
          backgroundColor: theme.cardBackground, // Use the theme's card background color
        },
        headerTitleStyle: {
          color: theme.text, // Use the theme's text color for the title
        },
        headerTintColor: theme.text, // Use the theme's text color for back button/icons
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={Index}
        options={{ 
          title: 'Job Listings', // Customize the header title
          headerBackVisible: false, // Hide back button on the home screen
        }}
      />
      {/* Login Screen */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login' }}
      />
      {/* Bookmarked Jobs Screen */}
      <Stack.Screen
        name="BookmarkedJobs"
        component={BookmarkedJobs}
        options={{ title: 'Bookmarked Jobs' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/appnavigator/AppNavigator';
import { GlobalProvider, useGlobalContext } from './src/context/globalContext';
import { NavigationContainer } from '@react-navigation/native';

// Create a wrapper component to access the theme
const ThemedApp = () => {
  const { theme } = useGlobalContext();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <ThemedApp />
      </NavigationContainer>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
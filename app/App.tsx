import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from  './src/appnavigator/AppNavigator';
import { GlobalProvider } from './src/context/globalContext';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GlobalProvider>
      <AppNavigator />
      </GlobalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

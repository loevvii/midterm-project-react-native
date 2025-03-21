console.log("shit loaded sire");
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Index = () => {
  const [number, onChangeNumber] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} // Added missing input style
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter a number"
        keyboardType="numeric"
      />
      <Text style={styles.text}>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#FF0000',
    fontSize: 18,
  },
  input: {
    height: 40,
    width: 200, // Set width so it's visible
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Space between input and text
  },
});

export default Index;

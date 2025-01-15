import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23272A',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DFDFDF', 
  },
});

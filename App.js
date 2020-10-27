import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  welcome: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const alertActions = [
  {
    text: 'Cancel',
    style: 'cancel',
    onPress: () => console.log('Cancel button pressed!'),
  },
  {
    text: 'Done',
    onPress: () => console.log('Done button pressed!'),
  },
]

export default function App() {
  const technoAlert = () => {
    Alert.alert(
      "Technopreneurship Campus",
      "Primakara Luar Biasa!",
      alertActions,
      { cancelable: true }
    )
  }

  return (
    <View style={[styles.container]}>
      <View style={{ padding: 16 }}>
        <Text style={[styles.welcome]}>
          Welcome to Photos App
        </Text>
        <Button
          title={"Show alert"}
          onPress={technoAlert}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

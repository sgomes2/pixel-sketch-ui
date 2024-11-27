import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Text>Pixel Sketch</Text>
      <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
        <View style={{backgroundColor: 'blue', margin: 1,  flex: 0.05}} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  pixel: {
    backgroundColor: 'blue',
  }
});

import { StatusBar } from 'expo-status-bar';
import * as MediaLib from 'expo-media-library';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  welcome: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

export default function App() {
  const [photos, setPhotos] = useState([]);

  const showAlertHandler = () => {
    Alert.alert(
      'Technopreneurship Campus',
      'Primakara Luar Biasa!',
      [
        { text: 'Done' },
      ],
      { cancelable: true }
    );
  };
  const showImagesHandler = async () => {
    const { granted } = await MediaLib.requestPermissionsAsync();
    if(granted) {
      const media = await MediaLib.getAssetsAsync();
      const slicedImage = media.assets.slice(0, 10);
      setPhotos(slicedImage);
    } else {
      Alert.alert(
        'Not Allowed',
        'This app does not allowed to see the your photos.',
        [],
        { cancelable: true },
      );
    }
  };

  const PhotoGallery = () => (
    <FlatGrid
      itemDimension={150}
      data={photos}
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <View style={{ height: 150 }}>
          <Image
            style={{
              flex: 1,
              borderRadius: 12,
              resizeMode: 'cover',
            }}
            source={{ uri: item.uri }}
          />
        </View>
      )}
    />
  );
  const EmptyState = () => (
    <View>
      <Text>Empty state</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ padding: 16 }}>
        <Text style={[styles.welcome]}>
          Welcome to Photos App
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 8 }}>
            <Button
              title={"Show alert"}
              onPress={showAlertHandler}
            />
          </View>
          <View>
            <Button
              title={"Show images"}
              onPress={showImagesHandler}
            />
          </View>
        </View>
      </View>
      {photos.length === 0 ? <EmptyState/> : <PhotoGallery/>}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

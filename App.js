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
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <MaterialCommunityIcons
        name="image-search-outline"
        size={120}
        color="#808080"
        style={{ marginBottom: 16 }}
      />
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      }}>
        Opps! No images to display.
      </Text>
      <Button
        title={"Show images"}
        onPress={showImagesHandler}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      }}>
        <Text style={[styles.welcome]}>
          Welcome to Photos App
        </Text>
        <Button
          title={"Show alert"}
          onPress={showAlertHandler}
        />
      </View>
      {photos.length === 0 ? <EmptyState/> : <PhotoGallery/>}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

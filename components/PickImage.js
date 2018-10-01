import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, H3, Text} from "native-base";
import { Constants, ImagePicker } from 'expo';
import uuid from 'uuid';
import firebase from '../firebase';

console.disableYellowBox = true;


export default class PickImage extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  reset = () => {
    this.setState({
      image: null,
      uploading: false,
    });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5, marginBottom:5 }}>
        
        <Button transparent 
                  onPress={this._pickImage} >
          <Text style={styles.text}> Pick an Image from Gallery </Text>
          </Button>


        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2,
          marginBottom: 10
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

      </View>
    );
  };



  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
   
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
      this.props.imagePickedHandler(this.state.image);
    }
  };
}

async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}

const styles = StyleSheet.create({
  text: {
    color: "#007aff" ,
    fontSize: 18,
    fontWeight: '500',
    alignItems: 'center'
  }

})
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  text:{
    color: 'black'
  }
});


const slides = [
  {
    key: 'somethun',
    title: 'SEARCH',
    text: 'Looking for the perfect home for you in a few clicks without losing time',
    textStyle: styles.text,
    titleStyle: styles.text,
    image: require('../assets/images/slide1.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
  },
  {
    key: 'somethun1',
    title: 'FIND',
    text: 'Once you have found the perfect home contact the seller and receive the answer in few hours',
    image: require('../assets/images/slide2.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: 'white'  
  },
  {
    key: 'somethun2',
    title: 'ENJOY',
    text: 'What else? Now enjoy your home and invite friends for a party',
    image: require('../assets/images/slide3.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: 'white',
  },
];
export default class App extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(0, 0, 0,.5)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(0, 0, 0,.5)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
    onSlideComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        activeDotColor='rgba(0, 0, 0,.5)'
        dotColor='rgba(0, 0, 0, .2)'
        onDone={this.onSlideComplete}
      />
    );
  }
}



// import React, { Component } from 'react';
// import { View, Text } from 'react-native';


// import Slides from '../components/Slides';
// import AuthScreen from './AuthScreen';

// const SLIDE_DATA = [
//   { text: 'Welcome to GharbetiApp', color: '#03A9F4' },
//   { text: 'Use this to  find rooms', color: '#009688' },
//   { text: 'Set your location, then swipe away', color: '#EC407A' },
// ];

// export default class WelcomeScreen extends Component {
 

//   render() {
//     return (
//      <Slides data={SLIDE_DATA} onComplete ={this.onSlideComplete} />
//     );
//   };
// };




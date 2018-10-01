import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View} from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import AddScreen from './screens/AddScreen';
import ReviewScreen from './screens/ReviewScreen';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style ={styles.container}>
        <MainNavigator/>
      </View>
      </Provider>
    );
  }
}

const MainNavigator = StackNavigator({
  welcome: { screen: WelcomeScreen },
  auth: {screen: AuthScreen},
  mainapp: {
    screen: TabNavigator({
      map:{screen : MapScreen},
      explore:{screen : DeckScreen},
      add:{screen : AddScreen},
      more: {screen : ReviewScreen}
      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          style: { backgroundColor:'rgba(192.192,192)'},
          labelStyle: { fontSize: 14, color: 'black'}
        }
    })
   }
 },
   {
     headerMode: 'none',
    navigationOptions: {
      tabBarVisible: false,
    },
    lazy: true,
   })
   ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24 
  },
});

export default App;
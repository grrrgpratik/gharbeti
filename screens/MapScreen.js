import React, { Component } from 'react';
import { View , Text, ActivityIndicator} from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import {connect} from 'react-redux';

import * as action from '../actions';


class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  }


  state = {
    mapLoaded: false,
    region:{
      longitude: 83.99745554,
      latitude: 28.22172079,
      longitudeDelta: 0.04,
      latitudeDelta:0.09
    }
  }
  componentDidMount(){
    this.setState({ mapLoaded: true});
  }
  
  onRegionChangeComplete = (region) => {
      this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchRooms()
    .catch(error => {
      return error;
    });
    this.props.navigation.navigate('explore');

  }


  render() {
    if(!this.state.mapLoaded){
      return(
        <View style={{flex:1, justifyContent: 'center'}} >
         <ActivityIndicator size="large"/>
         </View>
      )
    }
    return (
      <View style= {{flex: 1}} >
         <MapView 
              region={this.state.region}
              style={{flex: 1}}
              onRegionChangeComplete={this.props.onRegionChangeComplete}/>


       <View style={styles.buttonContainer}>
       <Button
         large
         title="Search This Area"
         backgroundColor="#009688"
         icon={{ name: 'search' }}
         onPress={this.onButtonPress}
       />
     </View>
  </View>  

    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
  }
}
 

export default connect(null, action)(MapScreen);
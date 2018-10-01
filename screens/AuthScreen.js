
import React, { Component } from 'react';
import firebase from '../firebase';
import { StyleSheet, Text, View, ImageBackground, Dimensions, KeyboardAvoidingView} from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import MapScreen from '../screens/MapScreen';
import AuthScreen from '../screens/AuthScreen';


import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/background.png');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      error: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
      loggedIn: false,
    };
  }

  componentWillMount(){
    
    firebase.auth().onAuthStateChanged((user) =>{
      if(user) {
        this.setState({ loggedIn: true})
      }
      else{
        this.setState({ loggedIn: false})
      }
    }) ;   
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
      'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  submitLoginCredentials() {
    const { showLoading, email, password} = this.state;

    this.setState({
      showLoading: !showLoading
    });

    this.setState({error: '',showLoading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then (()=> {
          this.setState({
            email:'',
            password:'',
            showLoading: false,
            error:''
        });
          this.props.navigation.navigate('map')
        })

        .catch((error) => {
            console.log(error);
            this.setState({ error : 'Authentication Failed', loading: false});
                })   
  }

 onSignUp(){
  const { showLoading, email, password} = this.state;

  this.setState({
    showLoading: !showLoading
  });

  this.setState({error: '',showLoading: true});

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then (()=> {
        this.setState({
          email:'',
          password:'',
          showLoading: false,
          error:''
      });
        this.props.navigation.navigate('map')
      })

      .catch((error) => {
          console.log(error);
          this.setState({ error : 'Authentication Failed', loading: false});
              })   
 }

  render() {
    const { email, password, email_valid, showLoading } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
        { this.state.fontLoaded ?
          <View style={styles.loginView}>
          
            <View style={styles.loginTitle}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.travelText}>GHARBETI</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
          
              <FormInput  
                label="Email"
                containerStyle={{marginVertical: 10}}
                onChangeText={email => this.setState({email})}
                value={email}
              
                inputStyle={{marginLeft: 145, color: 'black'}}
                 keyboardAppearance="light"
                 placeholder="Email"
                 autoFocus={false}
                 autoCapitalize="none"
                 autoCorrect={false}
                 keyboardType="email-address"
                 returnKeyType="next"
                 ref={ input => this.emailInput = input }
                 onSubmitEditing={() => {
                  this.setState({email_valid: this.validateEmail(email)});
                 this.passwordInput.focus();
                 }}
                 blurOnSubmit={false}
                 placeholderTextColor="black"
                 errorStyle={{textAlign: 'center', fontSize: 12}}
                 errorMessage={email_valid ? null : "Please enter a valid email address"}
              />
              <FormInput
                label="Password"
                containerStyle={{marginVertical: 10}}
                onChangeText={(password) => this.setState({password})}
                value={password}
                inputStyle={{marginLeft: 150, color: 'black'}}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                 ref={ input => this.passwordInput = input}
                blurOnSubmit={true}
                placeholderTextColor="black"
              />
            </View>
            <Text style={styles.errorTextStyle}> 
                {this.state.error}
            </Text>
            <Button
              title='LOG IN'
              activeOpacity={1} 
              onPress={this.submitLoginCredentials.bind(this)}
              loading={showLoading}
              loadingProps={{size: 'small', color: 'black'}}
              disabled={ !email_valid && password.length < 6}
              buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderRadius: 30}}
              containerStyle={{marginVertical: 5}}
              textStyle={{fontWeight: "700", color: 'black' }}
            />
            <View style={styles.footerView}>
              <Text style={{color: 'black'}}>
                New here?
              </Text>
              <Button
                title="Create an Account"
                clear
                disabled={ !email_valid && password.length < 6}
                activeOpacity={0.5}
                buttonStyle={{backgroundColor:'transparent'}}
                textStyle={{color: 'black', fontSize: 15}}
                containerStyle={{marginTop: -5}}
                onPress={this.onSignUp.bind(this)}
              />
            </View>
           
          </View> :
          <Text>Loading...</Text>
        }
        </ImageBackground>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    behaviour: "padding",
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginView: {
    marginTop: 85,
    backgroundColor: 'transparent',
    width: 270,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold'
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular'
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTextStyle: {
      fontSize: 20,
      alignItems: 'center',
      color: 'red'
  }
 
});

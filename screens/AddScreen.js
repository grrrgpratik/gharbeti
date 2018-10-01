import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

import { Text,Container, Header, Content, Form, Item, Input, Label, Body, Left, Right,Textarea, Button,Picker} from 'native-base';
import HeadingText from "../components/UI/HeadingText/HeadingText";
import { TagSelect } from 'react-native-tag-select';
import PickImage from "../components/PickImage";
import PickLocation from "../components/PickLocation";
import { addNewRoom } from "../networking/server";
import uuid from 'uuid';
import firebase from '../firebase';
import validate from '../utility/validation';


export default class AddRoom extends Component {
  constructor(props){
    super(props)
  
  };
  componentWillMount() {
    this.reset();
  }


reset = () => {
  this.setState({
    controls: {
      name:{
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      phoneNumber:{
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      roomName: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      price: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      description:{
        value:"",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      },
      bedRoom:{
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      livingRoom:{
        value:"",
        valid:false,
        validationRules: {
          notEmpty: true
        }
      },
      kitchenRoom: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        }
      },
      bathRoom: {
        value:"",
        valid:false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  });
}

  nameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          name: {
            ...prevState.controls.name,
            value: val,
            valid: validate(val, prevState.controls.name.validationRules),
            touched: true
          }
        }
      };
    });
  };

  roomNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          roomName: {
            ...prevState.controls.roomName,
            value: val,
            valid: validate(val, prevState.controls.roomName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  phoneNumberChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          phoneNumber: {
            ...prevState.controls.phoneNumber,
            value: val,
            valid: validate(val, prevState.controls.phoneNumber.validationRules),
            touched: true
          }
        }
      };
    });
  };

  descriptionChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          description: {
            ...prevState.controls.description,
            value: val,
            valid: validate(val, prevState.controls.description.validationRules),
            touched: true
          }
        }
      };
    });
  };

  priceChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          price: {
            ...prevState.controls.price,
            value: val,
            valid: validate(val, prevState.controls.price.validationRules),
            touched: true
          }
        }
      };
    });
  };

  bedRoomHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          bedRoom: {
            ...prevState.controls.bedRoom,
            value: val,
            valid: validate(val, prevState.controls.bedRoom.validationRules),
            touched: true
          }
        }
      };
    });
  };

  kitchenRoomHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          kitchenRoom: {
            ...prevState.controls.kitchenRoom,
            value: val,
            valid: validate(val, prevState.controls.kitchenRoom.validationRules),
            touched: true
          }
        }
      };
    });
  };

  livingRoomHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          livingRoom: {
            ...prevState.controls.livingRoom,
            value: val,
            valid: validate(val, prevState.controls.livingRoom.validationRules),
            touched: true
          }
        }
      };
    });
  };

  bathRoomHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          bathRoom: {
            ...prevState.controls.bathRoom,
            value: val,
            valid: validate(val, prevState.controls.bathRoom.validationRules),
            touched: true
          }
        }
      };
    });
  };


  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image ,
            valid: true
          }
        }
      }
    }) ;
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };


  onSubmitForm = () => {
     fetch("https://gharbeti-4f308.firebaseio.com/rooms.json", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            name: this.state.controls.name.value,
            roomName: this.state.controls.roomName.value,
            phoneNumber: this.state.controls.phoneNumber.value,
            description: this.state.controls.description.value,
            price:  this.state.controls.price.value,
            facilities:  this.tag.itemsSelected,
            location: this.state.controls.location.value,
            bedRoom:  this.state.controls.bedRoom.value,
            kitchenRoom:  this.state.controls.kitchenRoom.value,
            livingRoom: this.state.controls.livingRoom.value,
            bathRoom: this.state.controls.bathRoom.value,
            image: this.state.controls.image.value,
            
          })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then (() => {
        alert("Room added successfully!!");
        this.reset();
        this.imagepicker.reset();
        this.locationPicker.reset();
        this.tag.refs;
        })
        
      }

  

 render() {
    const data = [
      { id: 1, label: 'Water Drinking' },
      { id: 2, label: 'Parking Car' },
      { id: 3, label: 'Parking Bike' },
      { id: 4, label: 'Water Solar' },
      { id: 5, label: 'Sharing TV-Channel Cable'},
      { id: 6, label: 'Wifi'}
    ];
 
    return (

      <Container style= {{backgroundColor: 'white'}}>
        <Header style={{ backgroundColor : 'white' }} >
                        <HeadingText>Add Room</HeadingText>
        </Header>
        <Content>
          <Form>
          <Item stackedLabel>
              <Label style={styles.labelText}>Name</Label>
              <Input  onChangeText= {this.nameChangedHandler}
                      value = {this.state.controls.name.value}
                      placeholder= "Eg: John Dae"
                      placeholderTextColor = "#D3D3D3"/>
            </Item>

            <Item stackedLabel>
              <Label style={styles.labelText}>Room Name</Label>
              <Input onChangeText={this.roomNameChangedHandler}
                     value={this.state.controls.roomName.value} 
                     placeholder= "Eg: Flat or Room#123"
                     placeholderTextColor = "#D3D3D3"/>
            </Item>

            <Item stackedLabel>
              <Label style={styles.labelText}>Phone Number</Label>
              <Input onChangeText= {this.phoneNumberChangedHandler}
                     value={this.state.controls.phoneNumber.value}
                     keyboardType = "phone-pad"
                     placeholder = "Eg : 9846000000"
                     placeholderTextColor = "#D3D3D3"/>
            </Item>

            <Content padder>
            <Label style={styles.labelText}> Description</Label>
              <Textarea rowSpan={5} bordered placeholder="Describe your environment in few words" 
                        value={this.state.controls.description.value}
                        onChangeText= {this.descriptionChangedHandler}
                        placeholderTextColor = "#D3D3D3"/>
              </Content>

              <Item stackedLabel>
              <Label style={styles.labelText}>Price</Label>
              <Input value={this.state.controls.price.value}
                     onChangeText={this.priceChangedHandler}
                     keyboardType = "numeric"
                     placeholder = "Eg: 10000"
                     placeholderTextColor = "#D3D3D3"/>
              </Item >

              <View style = {{marginTop: 15 ,marginLeft: 8 }}>
              <Text style={{  color: '#333', 
                               fontSize: 15,
                               fontWeight: '500', 
                               marginBottom: 10,
                               marginLeft: 8,} }>Facilities</Text>
                <TagSelect
                  data={data}
                  itemStyle={styles.item}
                  itemLabelStyle={styles.label}
                  itemStyleSelected={styles.itemSelected}
                  itemLabelStyleSelected={styles.labelSelected}
                  ref={(tag) => {
                    this.tag = tag;
                  }}
                />
              </View>

               <View style = {{marginTop: 15, marginBottom: 10}}>   
              <PickLocation onLocationPick={this.locationPickedHandler} 
                            ref = {ref => (this.locationPicker = ref)}/>
              </View>

              
              <Item stackedLabel>
              <Label style={styles.labelText}>Total Bed Room</Label>
              <Input value={this.state.controls.bedRoom.value}
                     onChangeText={this.bedRoomHandler}
                     keyboardType= "numeric"
                     placeholder = "Eg: 2"
                     placeholderTextColor = "#D3D3D3"/>
              </Item>

              <Item stackedLabel>
              <Label style={styles.labelText}>Total Kitchen Room</Label>
              <Input value={this.state.controls.kitchenRoom.value}
                     onChangeText={this.kitchenRoomHandler}
                     keyboardType= "numeric"
                     placeholder = "Eg: 2"
                     placeholderTextColor = "#D3D3D3"/>
              </Item>

              <Item stackedLabel>
              <Label style={styles.labelText}>Total Living Room</Label>
              <Input value={this.state.controls.livingRoom.value}
                     onChangeText={this.livingRoomHandler}
                     keyboardType= "numeric"
                     placeholder = "Eg: 2"
                     placeholderTextColor = "#D3D3D3"
                     />
              </Item>
              
              <Item stackedLabel>
              <Label style={styles.labelText}>Total Toilet/ BathRoom</Label>
              <Input value={this.state.controls.bathRoom.value} 
                     onChangeText={this.bathRoomHandler}
                     keyboardType= "numeric"
                     placeholder = "Eg: 2"
                     placeholderTextColor = "#D3D3D3"
                     />
              </Item>

              <View style = {{marginTop: 15}}>
              <PickImage imagePickedHandler = {this.imagePickedHandler}
                          ref = {ref => (this.imagepicker = ref)} />
              </View>
 
              <View style ={{ marginTop: 15, justifyContent:'center', marginBottom:15, flexDirection: 'row' }}>
               <Button dark style={{  justifyContent: 'center', alignContent: 'center'}} 
                                      onPress = {this.onSubmitForm} 
                                      disabled ={
                                        !this.state.controls.name.valid ||
                                        !this.state.controls.roomName.valid ||
                                        !this.state.controls.phoneNumber.valid ||
                                        !this.state.controls.description.valid ||
                                        !this.state.controls.price.valid ||
                                        !this.state.controls.bedRoom.valid ||
                                        !this.state.controls.kitchenRoom.valid ||
                                        !this.state.controls.livingRoom.valid ||
                                        !this.state.controls.bathRoom.valid 
                                      }
                                      >

               <Text style={{color:'white', fontWeight: '400' }}>   Add room   </Text>
               </Button>
               </View>
            
          </Form>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  item: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#333',    
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
  //  buttonstyle: {
    
  // }
});
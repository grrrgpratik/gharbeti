import React, { Component } from 'react';
import { Image, ListView, Modal} from 'react-native';
import {connect} from 'react-redux';
import HeadingText from "../components/UI/HeadingText/HeadingText";
import { Container ,Spinner ,Header, Content, Card, List,ListItem, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';


import ViewDetails from '../components/Viewdetails';

export default class DeckScreen extends Component {
   constructor(props) {
     super(props);
     this.state = ({
       results : {
        roomFromFirebase: [],
       },
       selectedItem : [],
       isLoading: true,
       modalVisible: false,
     });
   }



setModalVisible(visible, x) {
    this.setState({
        modalVisible: visible,
        selectedItem: x
    });
}

  componentDidMount(){
    var self = this;
    fetch("https://gharbeti-4f308.firebaseio.com/rooms.json")
    .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
    })
    .then(res => res.json())
    .then(parsedRes => {
           self.setState({
            results: parsedRes,
            isLoading: false
           })
        });
        
    }


render(){
  var self = this ; 
  return (
    this.state.isLoading ? 
        <Container>
          <Header style={{ backgroundColor : 'white' ,alignContent:'center' }} >
                  <HeadingText>Explore</HeadingText>
            </Header>
           <Content>
                   <Spinner color='black' />
            </Content>
        </Container> :

          <Container>        
           <Header style={{ backgroundColor : 'white' }} >
                  <HeadingText>Explore</HeadingText>
            </Header>
            <Content>     
                <Card style={{flex: 1}}  
                      dataArray={this.state.results} 
                      renderRow={ (item) => 
           <Content>
                <CardItem>
                  <Left>
                  <Thumbnail source={{uri: item.image}} />
                    <Body>
                      <Text> {item.roomName} </Text>
                      <Text note>Owned by: {item.name}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Image source={{uri:item.image}} style={{height: 250, width: 375, flex: 1}}/>
                    <Text style = {{ marginTop:10 }}>
                      {item.description}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent textStyle={{color: '#87838B'}} 
                            onPress={()=>this.setModalVisible(true, item)} >
                      <Icon name="logo-github" />
                      <Text>View Details</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>Rs. {item.price} /month </Text>
                  </Right>
                </CardItem> 
           </Content>
                    } />
               

               <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)}
                    >
                { !this.state.selectedItem ? 
                <View /> :
               <ViewDetails selectedItem = {this.state.selectedItem}  />
                }
               </Modal>


         </Content>
          </Container>
        );
      }
    }
 

// const styles = {
//   detailWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   }
// }

// const mapStateToProps = state => {
//   return { rooms: state.rooms.results };
// }


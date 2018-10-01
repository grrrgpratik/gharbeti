
import React, { Component } from 'react';
import { StyleSheet, Modal, Image } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3 } from 'native-base';

export default class SettingScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        results : {
            items: [],
        },
        selectedItem : undefined,
        isLoading: true,
        modalVisible: false,
      }
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
    .then((parsedRes) => {
           this.setState({
            results: parsedRes,
           });
           console.log(results);
        })
    setTimeout(function () {
         self.setState({ isLoading: false });
    }, 1);
    }

  render() {
    return (
      <Container>
                <Header/>
            <Content>
                {this.state.isLoading ?    
                     <Content>
               <Spinner color='green' />
                     </Content> :
                 <List dataArray={this.state.results} renderRow={(item) =>
                        <ListItem button onPress={()=>this.setModalVisible(true, item)} >
                                <Thumbnail square size={80} source={{uri: item.image}} />
                                <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{item.name}</Text></Text>

                                <Text style={{color:'#007594'}}>{item.roomName}</Text>
                                <Text note>Score: <Text note style={{marginTop: 5}}>{item.price}</Text></Text>
                            </ListItem>
                        } />}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <Card style={{paddingTop: 20}}>
                        {!this.state.selectedItem ? <View />
                        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
                            <Image style={styles.modalImage} source={{uri: this.state.selectedItem.image}}  />
                            <H3 style={styles.header}> {this.state.selectedItem.name}
                            </H3>
                            <Text style={styles.negativeMargin} >
                                Type: <Text style={styles.bold}>{this.state.selectedItem.description}</Text>
                            </Text>
                            <Text style={styles.negativeMargin} >
                                Stars: <Text style={styles.bold}>{this.state.selectedItem.price}</Text>
                            </Text>
                            <Text style={styles.negativeMargin} >
                                Language: <Text style={styles.bold}>{this.state.selectedItem.name}</Text>
                            </Text>
                            <Text style={styles.negativeMargin} >
                                Open Issues: <Text style={styles.bold}>{this.state.selectedItem.roomName}</Text>
                            </Text>
                            <Text>
                                Last Update: <Text style={styles.bold}>{this.state.selectedItem.name}</Text>
                            </Text>
                            <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                }}>
                                Go Back
                            </Button>
                        </CardItem>
                        }
                    </Card>
                </Modal>
            </Content>
            </Container>
         );
     }
 }

 
const styles = StyleSheet.create({
  header : {
      marginLeft: -5,
      marginTop: 5,
      marginBottom: (Platform.OS==='ios') ? -7 : 0,
      lineHeight: 24,
      color: '#5357b6'
  },
  modalImage: {
      resizeMode: 'contain',
      height: 200
  },
  bold: {
      fontWeight: '600'
  },
  negativeMargin: {
      marginBottom: -10
  }
});
import { MapView } from 'expo';
import { Container, Content, Header, Right, List, ListItem, Text, View, Left } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import HeadingText from "../components/UI/HeadingText/HeadingText";


export default class ViewDetails extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            focusedLocation: {
              longitude:this.props.selectedItem.location.longitude,
              latitude: this.props.selectedItem.location.latitude,
              latitudeDelta: 0.0122,
              longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
            },
    });   
    }

    render(){

        const selectedItem = this.props.selectedItem;
        

        marker =  <MapView.Marker coordinate = {selectedItem.location} />;
        
        return (
            <Container>
            <Header style={{ backgroundColor : 'white' ,alignContent:'center' }} >
                  <HeadingText>{selectedItem.roomName}</HeadingText>
            </Header>

            <Content>
                <ListItem itemDivider style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={{ uri: selectedItem.image }} style={{ height: 250, width: "100%" }} />
                </ListItem>

                <List style={{ backgroundColor: 'white' }}>           
                    <ListItem itemDivider>
                        <Text>Owned by</Text>
                    </ListItem>
                    <ListItem >
                        <Text>{selectedItem.name}</Text>
                    </ListItem>

                    <ListItem itemDivider>
                        <Text>Description</Text>
                    </ListItem>
                    <ListItem >
                        <Text>{selectedItem.description}</Text>
                    </ListItem>

                     <ListItem itemDivider>
                        <Text>Map Location</Text>
                    </ListItem>   
                    <MapView    region = {this.state.focusedLocation}
                                style = {styles.map}>
                                {marker}
                    </MapView>

                     <ListItem itemDivider>
                        <Text>Facilities</Text>
                    </ListItem>
                    <List dataArray={selectedItem.facilities}
                          renderRow={(item) =>
                    <ListItem>
                         <Text>{item.label}</Text>
                    </ListItem>
                      }/>


                    <ListItem itemDivider>
                        <Text>Other Facilities</Text>
                    </ListItem>
                    <ListItem>
                        <Left>
                        <Text> Total Bed Room: </Text>
                        </Left>
                        <Right>
                            <Text> {selectedItem.bedRoom}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                    <Left>
                         <Text> Total Kitchen Room:  </Text>
                    </Left>
                         <Right>
                            <Text> {selectedItem.kitchenRoom}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                    <Left>
                        <Text> Total Bath Room:  </Text>
                    </Left>
                        <Right>
                            <Text> {selectedItem.bathRoom}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                    <Left>
                        <Text> Total Living Room:  </Text>
                    </Left>
                        <Right>
                            <Text> {selectedItem.livingRoom}</Text>
                        </Right>
                    </ListItem>    

                     <ListItem itemDivider>
                        <Text>Price</Text>
                    </ListItem>
                    <ListItem last>
                         <Text style={{color:'#333', fontWeight: '500', alignItems:'center', }}>
                               Rs. {selectedItem.price}  </Text>
                         <Text>per month </Text>
                    </ListItem>
             </List>
        </Content>
    </Container>
        );
    }
}

const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: 250
    },
})
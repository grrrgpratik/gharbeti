  import React, { Component } from 'react';
  import { Platform} from 'react-native';
  import { Container, Content, Header, Right, List, ListItem, Text, View, Left , Icon, Card, CardItem, Separator} from 'native-base';
  import  HeadingText  from '../components/UI/HeadingText/HeadingText';

  class ReviewScreen extends Component {

    render() {
      return (
        <Container style={{backgroundColor : 'white' }}>
          <Header style={{ backgroundColor : 'white' ,alignContent:'center' }} >
                    <HeadingText>More</HeadingText>
              </Header>

          <Content>
            <Separator bordered>
              <Text style= {{fontSize: 15}} > About Us</Text>
            </Separator>
            <ListItem >
              <Text>Privacy Policy</Text>
            </ListItem>
            <ListItem>
              <Text >Disclaimer</Text>
            </ListItem>
            <ListItem last>
              <Text>Terms and Conditions</Text>
            </ListItem>
            <Separator bordered>
              <Text style= {{fontSize: 15}}>Call Us</Text>
            </Separator>
            <ListItem> 
            <Text> +9779806678116, 061430628</Text>
            </ListItem>

            <Separator bordered>
              <Text style= {{fontSize: 15}}>Follow Us On:</Text>
            </Separator>
            <Card>
              <CardItem>
                <Icon active name="logo-facebook" />
                <Text>Facebook</Text>
              </CardItem>
              <CardItem>
                <Icon active name="logo-twitter" />
                <Text>Twitter</Text>
              </CardItem>
              <CardItem>
              <Icon active name="logo-youtube" />
                <Text>Youtube</Text>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
              </CardItem>
            </Card>
          
          </Content>
        </Container>
      
      );
    }
  }

  export default ReviewScreen;
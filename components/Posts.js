import React, { Component } from "react";
import {AsyncStorage} from 'react-native';
import {Text} from 'react-native-elements';
import { Accordion, Body, Button, Container, Content, Header, Icon,List, ListItem, Left, Right, Segment, Title } from "native-base";


export default class Posts extends Component {
  constructor() {
    super();
    this.state= {
      'posts': [],
      'page': 1
    };
  }
  componentWillMount(){
    ctx = this
    AsyncStorage.getItem("posts",
            function(error, data){
              console.log(JSON.parse(data));
              ctx.setState({"posts": JSON.parse(data)});
            })
          }

  render() {
    //pagination 10 by 10
    var first = (this.state.page-1)*10
    var last = this.state.page*10-1
    dataArray = this.state.posts.slice(first,last)
    return (
      <Container>
      <Header hasSegment style={{paddingTop: 50, paddingBottom:23}}>
      <Left>
      {this.state.page >1 ?
        <Button transparent  onPress={() => {
                    this.setState({
                      "page": this.state.page-1
                    })
                  }}>
          <Icon name='arrow-back'   style={{color: "#42a8b6"}}/>
        </Button>
        : null
        }
        </Left>
        <Body>
          <Segment>
            <Text style={{paddingTop: 10, color: "#42a8b6", textAlign : "center"}}>Page no {this.state.page}</Text>
          </Segment>
        </Body>
        <Right>
        {this.state.page < 5 ?
          <Button transparent onPress={() => {
                      this.setState({
                        "page": this.state.page+1
                      })
                    }} >
            <Icon name='arrow-forward'   style={{color: "#42a8b6"}}/>
          </Button>
                : null }
        </Right>
      </Header>
        <Content padder>
           <Accordion
          dataArray={dataArray}
          contentStyle={{ backgroundColor: "#e2fcff" }}/>
        </Content>
      </Container>
    );
  }
}

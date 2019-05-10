import React, { Component } from "react";
import {Alert} from 'react-native'
import { Body, Button, Title, Container, Header, Content, Accordion,List, ListItem, Text, Left, Right, Icon, Segment } from "native-base";


export default class Posts extends Component {
  constructor() {
    super();
    this.state= {
      'posts': [],
      'page': 1
    };
  }
  componentWillMount(){
    var ctx = this;
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response){
      return response.json();
    }).then(function(data){
      // check if we got the data
      console.log(data)
      //change key "body" to "content" to be compatible with Accordion
      var posts = data.map((post) => {
        post.content = post.body; delete post.body;return post;
      });
      // sort post by alphabetical order
      posts.sort(function (a, b) {
        return (a.title).localeCompare(b.title);
      })
      //stock posts in the state
      ctx.setState({"posts": posts});
    }).catch(function(error){
      console.error(error);
    });
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
          <Icon name='arrow-back' />
        </Button>
        : null
        }
        </Left>
        <Body>
          <Segment>
            <Text style={{paddingTop: 10, textAlign : "center"}}>Page no {this.state.page}</Text>
          </Segment>
        </Body>
        <Right>
        {this.state.page < 5 ?
          <Button transparent onPress={() => {
                      this.setState({
                        "page": this.state.page+1
                      })
                    }} >
            <Icon name='arrow-forward'/>
          </Button>
                : null }
        </Right>
      </Header>
        <Content padder>
           <Accordion
          dataArray={dataArray}/>
        </Content>
      </Container>
    );
  }
}

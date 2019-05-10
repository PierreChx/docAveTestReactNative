import React from 'react';
import { AsyncStorage, Image, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ThemeProvider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Posts from './components/Posts';

const theme = {
  Button: {
    titleStyle: {
      color: '#42a8b6',
    },
  },
};


class HomeScreen extends React.Component {
  componentWillMount(){
    var ctx = this;
    AsyncStorage.getItem("posts",
            function(error, data){
              if(data!=null){
                console.log("Posts Already Loaded")
              }else{
                console.log("Posts is null")
                fetch('https://jsonplaceholder.typicode.com/posts')
                .then(function(response){
                  console.log(response)
                  return response.json();
                }).then(function(data){
                  var posts = data.map((post) => {
                    post.content = post.body; delete post.body;return post;
                  });
                  posts.sort(function (a, b) {
                    return (a.title).localeCompare(b.title);
                  })
                  AsyncStorage.setItem("posts", JSON.stringify(posts))
                }).catch(function(error){
                  console.error(error);
                });
              }
            })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#42a8b6'}}>
        <Image source={require('./assets/logo.png')} style={{width: 150, height: 150}} />
        <ThemeProvider  theme={theme}>
            <Button
              title="Display Posts"
              type="solid"
              onPress={() => this.props.navigation.navigate('Posts')}
              buttonStyle={{
              backgroundColor: "#ffffff",
              }}
            />
          </ThemeProvider>
      </View>
    );
  }
}

var StackNavigator = createStackNavigator({
  Home: HomeScreen,
  Posts: Posts
},
  {
    headerMode: 'none'
  });

export default Navigation = createAppContainer(StackNavigator);

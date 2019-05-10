import React from 'react';
import { View, Image, Platform } from 'react-native';
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

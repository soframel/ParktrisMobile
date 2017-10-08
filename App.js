import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import {ServerScreen} from './Server.js';
import styles from './styles.js';

class ParktrisHome extends React.Component {
    static navigationOptions = {
      title: 'Home',
      drawerLabel: 'Home',      
    }    
  
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <Icon.Button name="menu" onPress={() => navigate('DrawerOpen')}/>
          <Text style={styles.title}>Parktris</Text>
        <Text>Welcome to Parktris !</Text>
        <Button
          onPress={() => navigate('DrawerOpen')}
          title="Open Menu"
        />
        </View>
      );
    }
  }

const AppNavigator = DrawerNavigator({
  Home: {
    screen: ParktrisHome,
  },
  Server: {
    screen: ServerScreen,
  },
});

export default class App extends React.Component {
  render() {
  return <AppNavigator />;
  }
}

import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import ParktrisServer from './ParktrisServer.js';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/Entypo';

export class ServerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false,
      url: 'unknown',
      login: null,
      password: null,
      connectionResult: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@Parktris:serverURL').then((token) => {
      this.setState({
        url: token 
      });
    });
    AsyncStorage.getItem('@Parktris:login').then((token) => {
      this.setState({
        login: token
      });
    });
    AsyncStorage.getItem('@Parktris:password').then((token) => {
      this.setState({
        password: token
      });
    });
  }

  static navigationOptions = {
    title: 'Server & Login Settings',
    drawerLabel: 'Server & Login Settings',      
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu" onPress={() => navigate('DrawerOpen')}/>
        <Text style={styles.title}>Server Settings</Text>
        <Text>Parktris Mobile needs to know which parktris server to use in order to work.</Text>
        <Text>Server URL: </Text>
        <TextInput 
          style={styles.input}
          onChangeText={this.changeURL.bind(this)}
          value={this.state.url}
      />
      <Text>Login:</Text>
      <TextInput
          style={styles.input}
          onChangeText={this.changeLogin.bind(this)}
          value={this.state.login}
      />
      <Text>Password:</Text>
      <TextInput
          style={styles.input}
          onChangeText={this.changePassword.bind(this)}
          value={this.state.password}
          secureTextEntry={true}
      />
      <Button
        title="Check connection"
        onPress={this.checkConnection.bind(this)}
      />
      <Text>{this.state.connectionResult}</Text>
      
      </View>
    );
  }
  async changeURL(url){
    this.setState({url: url});
    try {
      await AsyncStorage.setItem('@Parktris:serverURL', url);
    } catch (error) {
      console.log("error while saving serverURL: "+error)
    }
  }
  async changeLogin(login){
    this.setState({login: login});
    try {
      await AsyncStorage.setItem('@Parktris:login', login);
    } catch (error) {
      console.log("error while saving login: "+error)
    }
  }
  async changePassword(pwd){
    this.setState({password: pwd});
    try {
      await AsyncStorage.setItem('@Parktris:password', pwd);
    } catch (error) {
      console.log("error while saving password: "+error)
    }
  }
  checkConnection(){
      ParktrisServer.checkConnection(this.state.url, this.state.login, this.state.password)
      .then(responseJson => { 
        console.log("checkConnection ok");
        this.setState({connectionResult: "connection ok"});
      })
      .catch(error => { 
        console.log("checkConnection error="+error); 
        this.setState({connectionResult: "problem with connection"});
      });
  }
  
}
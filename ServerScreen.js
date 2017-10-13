import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import ParktrisServer from './ParktrisServer.js';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/Entypo';

export class ServerScreen extends React.Component {

  static navigationOptions = {
    title: 'Server & Login Settings',
    drawerLabel: 'Server & Login Settings',      
  }

  server=new ParktrisServer();
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
      this.setState({
        url: this.server.getServerURL()
      });
      this.setState({
        login: this.server.getLogin()
      });
      this.setState({
        password: this.server.getPassword()
      });
      console.log("componentDidMount, this.state.url="+this.state.url);
  }


  changeURL(url){    
    this.setState({
      url: url
    });
    //this.server.changeURL(url);
  }
  changeLogin(login){    
    this.setState({
      login: login
    });
    //this.server.changeLogin(login);
  }
  changePassword(pass){    
    this.setState({
      password: pass
    });
    //this.server.changePassword(pass);
  }

  checkConnection(){
    this.server.changeConfiguration(this.state.url, this.state.login, this.state.password)
    .then(() =>{ 

      this.server.checkConnection()
        .then(responseJson => { 
          console.log("checkConnection ok");
          this.setState({connectionResult: "connection ok"});
        })
        .catch(error => { 
          console.log("checkConnection error="+error); 
          this.setState({connectionResult: "problem with connection"});
        });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu" onPress={() => navigate('DrawerOpen')}/>
        <Text style={styles.title}>Server Settings</Text>
        <Text>Parktris Mobile needs to know which parktris server to use in order to work. </Text>
        <Text>Server URL:</Text>
        <TextInput 
          style={styles.input}       
          value={this.state.url}
          onChangeText={this.changeURL.bind(this)}
        />
        <Text>Login:</Text>
        <TextInput
            style={styles.input}
            value={this.state.login}
            onChangeText={this.changeLogin.bind(this)}
        />
        <Text>Password:</Text>
        <TextInput
            style={styles.input}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={this.changePassword.bind(this)}
        />
        <Button
          title="Save and Check connection"
          onPress={this.checkConnection.bind(this)}
        />
        <Text>{this.state.connectionResult}</Text>
        <Button
          title="Home"
          onPress={() =>
            navigate('Home')
          }
        />
      </View>
    );
  }
}
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
//import {} from '../actions/actions.js';
import store from '../store/store.js';
import {saveUrl,saveLogin,savePassword,loadUrl,loadLogin,loadPassword} from '../actions/serverActions';

class ServerSettings extends React.Component {
  static navigationOptions = {
    title: 'Server & Login Settings',
    drawerLabel: 'Server & Login Settings',      
  }

  constructor(props) {
    super(props);
    this.props.loadUrl();
    this.props.loadLogin();
    this.props.loadPassword();
  }

  // componentDidMount() {
  //   this.props.loadUrl();
  //   this.props.loadLogin();
  //   this.props.loadPassword();
  // }

  changeURL(url){
    this.props.saveUrl(url);
  }
  changeLogin(login){    
    this.props.saveLogin(login);
  }
  changePassword(pass){    
   this.props.savePassword(pass);
  }

  checkConnection(){
    console.log("TODO: check connection");
      // this.server.checkConnection()
      //   .then(responseJson => { 
      //     console.log("checkConnection ok");
      //     this.setState({connectionResult: "connection ok"});
      //   })
      //   .catch(error => { 
      //     console.log("checkConnection error="+error); 
      //     this.setState({connectionResult: "problem with connection"});
      //   });

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu" onPress={() => navigate('DrawerOpen')}/>
        <Text style={styles.title}>Server Settings</Text>
        <Text>Parktris Mobile needs to know which parktris server to use in order to work.</Text>
        <Text>Server URL:</Text>
        <TextInput 
          style={styles.input}       
          value={this.props.serverUrl}
          onChangeText={this.changeURL.bind(this)}
        />
        <Text>Login:</Text>
        <TextInput
            style={styles.input}
            value={this.props.login}
            onChangeText={this.changeLogin.bind(this)}
        />
        <Text>Password:</Text>
        <TextInput
            style={styles.input}
            value={this.props.password}
            secureTextEntry={true}
            onChangeText={this.changePassword.bind(this)}
        />
        <Button
          title="Check connection "
          onPress={this.checkConnection.bind(this)}
        />
        <Text>{this.props.connectionResult}</Text>
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

const mapStateToProps = state => ({
  serverUrl: state.serverUrl,
  login: state.login,
  password : state.password
})

function mapDispatchToProps(dispatch) {
  return({
      loadUrl: () => {dispatch(loadUrl())},
      loadLogin: () => {dispatch(loadLogin())},
      loadPassword: () => {dispatch(loadPassword())},
      saveUrl: (url) => {dispatch(saveUrl(url))},
      saveLogin: (login) => {dispatch(saveLogin(login))},
      savePwd: (pwd) => {dispatch(savePwd(pwd))},
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerSettings)
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
//import {} from '../actions/actions.js';
import store from '../store/store.js';
import {saveUrl,saveLogin,savePassword,loadUrl,loadLogin,loadPassword,checkConnection} from '../actions/serverActions';
import {STATUS_ERROR,STATUS_OK,STATUS_UNKNOWN} from '../actions/actions';

class ServerSettings extends React.Component {
  static navigationOptions = {
    title: 'Server & Login Settings',
    drawerLabel: 'Server & Login Settings',      
  }

  // constructor(props) {
  //   super(props);
  //   this.props.loadUrl();
  //   this.props.loadLogin();
  //   this.props.loadPassword();
  // }

  componentDidMount() {
    this.props.loadUrl();
    this.props.loadLogin();
    this.props.loadPassword();
  }

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
    this.props.checkConnection(this.props.serverUrl,this.props.login,this.props.password);     
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
          title="Check connection"
          onPress={this.checkConnection.bind(this)}
        />
          <Text>{(this.props.connectionStatus !== 'undefined' && this.props.connectionStatus!==STATUS_UNKNOWN)?this.props.connectionStatus:""}</Text> 
        <Button
          title="Home"
          onPress={() =>
            navigate('Home')
          }
        />
      </View>
    );
  }

  showConnectionStatus(){
    if(this.props.connectionStatus !== 'undefined' && this.props.connectionStatus!=STATUS_UNKNOWN){
      return this.props.connectionStatus;
    }
    else{
      return "TEST"
    }
  }

}

/*
 <Text>{(this.props.connectionStatus !== 'undefined' && this.props.connectionStatus!==STATUS_UNKNOWN)?"":this.props.connectionStatus}</Text> 
        <Text>{this.showConnectionStatus.bind(this)}</Text>  */

const mapStateToProps = state => ({
  serverUrl: state.serverSettings.serverUrl,
  login: state.serverSettings.login,
  password : state.serverSettings.password,
  connectionStatus: state.serverSettings.connectionStatus
})

function mapDispatchToProps(dispatch) {
  return({
      loadUrl: () => {dispatch(loadUrl())},
      loadLogin: () => {dispatch(loadLogin())},
      loadPassword: () => {dispatch(loadPassword())},
      saveUrl: (url) => {dispatch(saveUrl(url))},
      saveLogin: (login) => {dispatch(saveLogin(login))},
      savePwd: (pwd) => {dispatch(savePwd(pwd))},
      checkConnection: (url,login,pwd) => {dispatch(checkConnection(url,login,pwd))}
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerSettings)
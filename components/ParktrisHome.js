import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../styles.js';
import { connect } from 'react-redux';
import {loadServerSettings} from '../actions/serverActions';

class ParktrisHome extends React.Component {
    static navigationOptions = {
      title: 'Home',
      drawerLabel: 'Home',      
    }    


  componentDidMount() {
    this.props.loadServerSettings();
    console.log("ParktrisHome: current serverUrl="+this.props.serverUrl, ", login="+this.props.login);
  }

  
    render() {
      return (
        <View style={styles.container}>
          <Icon.Button name="menu" onPress={() => this.props.navigation.openDrawer()}/>
          <Text style={styles.title}>Parktris</Text>
          <Text>Welcome to Parktris! </Text>
          <Button
            onPress={() => this.props.navigation.navigate('SlotManagement')}
            title="Manage Slots"
          />
        </View>
      );
    }
  }

  const mapStateToProps = state => ({
    serverUrl: state.serverSettings.serverUrl,
    login: state.serverSettings.login,
    password : state.serverSettings.password
  })
  
  function mapDispatchToProps(dispatch) {
    return({
      loadServerSettings: () => {dispatch(loadServerSettings())}
    })
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ParktrisHome)
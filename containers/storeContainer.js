import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
//import ParktrisServer from './ParktrisServer.js';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import store from '../store/store.js';
import {saveSettings,loadSettings} from '../actions/serverActions';

const mapStateToProps = state => ({
  serverUrl: state.serverUrl,
  login: state.login,
  password : state.password
})

function mapDispatchToProps(dispatch) {
  return({
      reset: () => { dispatch({ type: 'RESET' }) },
      save: () => {dispatch(saveSettings(this.state.serverUrl,this.state.login,this.state.password))},
      load: () => {dispatch(loadSettings())}
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerScreen)
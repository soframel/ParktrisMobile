import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';

export class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <Icon.Button name="menu"  style={styles.iconButton} onPress={() => navigate('DrawerOpen')}/>
          <Text style={styles.title}>Parktris</Text>
        </View>
    );
  }
  
  
}
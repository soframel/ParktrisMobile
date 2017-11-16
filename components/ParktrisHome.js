import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../styles.js';
import { connect } from 'react-redux';

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
          <Text>Welcome to Parktris!</Text>
          <Button
            onPress={() => navigate('DrawerOpen')}
            title="Open Menu"
          />
        </View>
      );
    }
  }

  const mapStateToProps = state => ({
  })
  
  function mapDispatchToProps(dispatch) {
    return({
    })
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ParktrisHome)
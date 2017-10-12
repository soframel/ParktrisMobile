import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/Entypo';

export class SlotManagement extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = { 
      showEdit: false,
      slotLocation: null,
      slotArea: null,
      slotDesc: null,
    };
  }

  static navigationOptions = {
    title: 'Manage Parking Slots',
    drawerLabel: 'Manage Parking Slots',      
  }

  renderEdit=function(){
    if(this.state.showEdit){
        return(
            <View style={styles.container}>
                <Text>Area: </Text>
                
                <Text>Location:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeURL.bind(this)}
                    value={this.state.slotLocation}/>
            </View>
        );
    }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu" onPress={() => navigate('DrawerOpen')}/>
        <Text style={styles.title}>{SlotManagement.navigationOptions.title}</Text>

        <Button
            title="Add Slots"
            onPress={() => this.editSlot(null)}
        />

        {this.renderEdit()}
      </View>      
    );

  }
  
  editSlot(slotId){
    if(slotId==null){
        //new slot
    }
  }
  
}
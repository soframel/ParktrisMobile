import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList} from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

class SlotManagement extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = { 
      showEdit: false,
      slotId: null,
      slotLocation: null,
      slotArea: null,
      slotDesc: null,
      slots: []
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
                <Text>Area:</Text>                
                <Text>Location:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeLocation.bind(this)}
                    value={this.state.slotLocation}/>
                <Text>Description:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeDescription.bind(this)}
                    value={this.state.slotDescription}/>                
              <Button
                  title="Save"
                  onPress={() => this.saveSlot()}
                  />
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

        {this.renderEdit()}

        <Text>Your Parking Slots:</Text>
        <FlatList
        data={this.state.slots}
        renderItem={({item}) => <View style={styles.oneLine}><Text style={{ alignSelf: 'stretch'}}>{item.location}</Text><Icon.Button name="pencil" onPress={() => this.editSlot(item)}/><Icon.Button name="trash" onPress={() => this.deleteSlot(item)}/></View>}
      />
        <Button
            title="Add Slot"
            onPress={() => this.editSlot(null)}
        />
      </View>      
    );

  }

  changeLocation(location){    
    this.setState({
      slotLocation: location
    });
  }
  changeDescription(desc){    
    this.setState({
      slotDesc: desc
    });
  }
  saveSlot(){
    console.log("saving slot with id="+this.state.slotId+", location="+this.state.slotLocation+
    ", description="+this.state.slotDesc+", area="+this.state.slotArea);
    this.setState({
      showEdit:false
    });
    //TODO: if id==null, create and get id, otherwise update
    newSlots=this.state.slots.slice();
    slot={
      //key: this.state.slotId,
      key: "new",
      location: this.state.slotLocation,
      desc: this.state.slotDesc,
      area: this.state.slotArea
    }
    newSlots.push(slot);
    this.setState({
      slots:newSlots
    });
  }
  deleteSlot(slot){
    console.log("deleting slot with id="+this.state.slotId+", location="+this.state.slotLocation+
    ",description="+this.state.slotDesc+", area="+this.state.slotArea);
    //TODO
  }
  
  editSlot(slot){
    if(slot==null){
        //new slot
        this.setState({
          showEdit:true,
          slotArea:null,
          slotLocation:null,
          slotId:null,
          slotDesc:null
        })
    }
    else{
      this.setState({
        showEdit:true,
        slotArea:slot.area,
        slotLocation:slot.location,
        slotId:slot.key,
        slotDesc:slot.desc
      })
    }
    
  }
  
}

const mapStateToProps = state => ({
})

function mapDispatchToProps(dispatch) {
  return({
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(SlotManagement)
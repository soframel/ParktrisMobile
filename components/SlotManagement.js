import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList,Picker, Item} from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import {saveSlot,storeSlot,loadOwnerSlots,getCurrentSlot,deleteSlot} from '../actions/slotActions';
import {loadServerSettings} from '../actions/serverActions';
import { loadAreas } from '../actions/areaActions.js';

class SlotManagement extends React.Component {
    
  constructor(props) {
    super(props);
    this.state={
      showEdit: false
    };
  }

  componentDidMount() {
    console.log("Slot Management: current serverUrl="+this.props.serverUrl +", login="+this.props.login);
    this.props.loadAreas(this.props.serverUrl, this.props.login, this.props.password);
    this.props.loadOwnerSlots(this.props.serverUrl, this.props.login, this.props.password);
  }

  static navigationOptions = {
    title: 'Manage Parking Slots',
    drawerLabel: 'Manage Parking Slots',      
  }

  renderEdit=function(){
    if(this.state.showEdit){
      console.log("renderEdit for slot "+this.props.name+", area="+this.props.areaId);
        return(
            <View style={styles.container}>
                <Text>Name:</Text>  
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeName.bind(this)}
                    value={this.props.name}/>
                <Text>Description:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeDescription.bind(this)}
                    value={this.props.desc}/>    
                <Text>Area: </Text>    
                <Picker
                  selectedValue={this.props.areaId}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.changeArea(itemValue)}
                  >
                   {this.props.areas.map((area) => {
                     //console.log("building Picker with item "+JSON.stringify(area));
                     return (<Picker.Item label={area.name} value={area.id} key={area.id} />) 
                    })}
                </Picker>                             
                <Icon.Button
                  title="Save"
                  style={styles.iconButton}
                  name="save"
                  onPress={() => this.saveSlot()}
                  />
              <Icon.Button
                  name="cross"
                  style={styles.iconButton}
                  title="Cancel"
                  onPress={() => this.cancelEdit()}
                  />
            </View>
        );
    }
}
  render() {
    slots  = this.props.slots;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu"  style={styles.iconButton} onPress={() => this.props.navigation.openDrawer()}/>
        <Text style={styles.title}>{SlotManagement.navigationOptions.title}</Text>

        {this.renderEdit()}

        <Text>Your Parking Slots:</Text>
        <Icon.Button
            title="Add Slot "
            name="plus"
            style={styles.iconButton}
            onPress={() => this.editSlot(null)}
        />
        <FlatList
        data={slots}
        keyExtractor={slot => slot.name}
        renderItem={({item}) => <View style={styles.oneLine}><Text style={{ alignSelf: 'stretch'}}>{item.name}</Text><Icon.Button name="pencil" style={styles.iconButton} onPress={() => this.editSlot(item)}/><Icon.Button name="trash" style={styles.iconButton} onPress={() => this.deleteSlot(item)}/></View>}
      />
      
        <Icon.Button
          title="Home"
          style={styles.iconButton}
          onPress={() =>this.props.navigation.navigate('Home')
          }
        />
      </View>      
    );

  }

  changeName(name){   
    this.props.storeSlot (this.props.id,name,this.props.desc,this.props.areaId,this.props.owner);
  }
  changeDescription(desc){    
    console.log("changing slot description to "+desc);
    this.props.storeSlot (this.props.id,this.props.name,desc,this.props.areaId,this.props.owner);
  }
  changeArea(areaId){    
    this.props.storeSlot (this.props.id,this.props.name,this.props.desc,areaId,this.props.owner);
    //why is this needed?
    this.props.areaId=areaId;
  }
  saveSlot(){
    console.log("saving slot with id="+this.props.id+", name="+this.props.name+
    ", description="+this.props.desc+", areaId="+this.props.areaId);
    this.setState({
      showEdit:false
    });
    this.props.saveSlot(this.props.serverUrl,this.props.login,this.props.password,this.props.id,this.props.name,this.props.desc,this.props.areaId,this.props.login);
  }
  cancelEdit(){
    this.setState({
      showEdit:false,
    })
    this.resetCurrentSlot();
  }


  resetCurrentSlot(){
    console.log("resetting current slot");
    this.props.storeSlot(null,null,null,null,null);
  }
  
  editSlot(slot){ 
    if(slot==null){
        //new slot
        console.log("creating new slot");   
        this.resetCurrentSlot(); 
        //select first entry for area
        var firstArea=new Object();
        if(this.props.areas.length>0){
          //get first area
          firstArea=this.props.areas[Object.keys(this.props.areas)[0]]         
        }
        else{
          console.log("no areas found")
        }
        this.props.storeSlot(null,null,null,firstArea['id'],null);
    }
    else{
      console.log("editing slot "+slot.id+", name="+slot.name)
      this.props.getCurrentSlot(slot.id);
    } 
    this.setState({
      showEdit:true,
    })
  }

  deleteSlot(slot){
    if(slot==null){
      console.log("deleting but no slot selected");    
    }
    else{
      console.log("deleting slot with id="+slot.id+", name="+slot.name+
      ",description="+slot.desc+", areaId="+slot.areaId);
      this.props.deleteSlot(this.props.serverUrl,this.props.login,this.props.password, slot.id);
    } 
  }
}

const mapStateToProps = state => ({
  serverUrl: state.serverSettings.serverUrl,
  login: state.serverSettings.login,
  password : state.serverSettings.password,
  id: state.slotSettings.slotId,
  name: state.slotSettings.slotName,
  desc: state.slotSettings.slotDescription,
  areaId: state.slotSettings.slotAreaId,
  ownerId: state.slotSettings.slotOwnerId,
  slots: state.slotSettings.slots,
  areas: state.areaStore.areas
})

function mapDispatchToProps(dispatch) {
  return({
    loadServerSettings: () => {dispatch(loadServerSettings())},
    storeSlot: (id, name, desc, areaId, owner) => {dispatch(storeSlot(id, name, desc, areaId, owner))},
    saveSlot: (url,login,pwd, id, name, desc, areaId, owner) => {dispatch(saveSlot(url,login,pwd, id, name, desc, areaId, owner))},
    loadOwnerSlots: (url,login,pwd) => {dispatch(loadOwnerSlots(url,login,pwd))},
    deleteSlot: (url,login,pwd, id) => {dispatch(deleteSlot(url,login,pwd, id))},
    getCurrentSlot: (id) => {dispatch(getCurrentSlot(id))},
    loadAreas: (url,login,pwd) => {dispatch(loadAreas(url,login,pwd))},
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(SlotManagement)
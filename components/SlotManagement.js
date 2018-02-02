import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList} from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import {saveSlot,storeSlot,loadOwnerSlots,getCurrentSlot} from '../actions/slotActions';
import {loadServerSettings} from '../actions/serverActions';

class SlotManagement extends React.Component {
    
  constructor(props) {
    super(props);
    this.state={
      showEdit: false
    };
  }

  componentDidMount() {
    console.log("Slot Management: current serverUrl="+this.props.serverUrl +", login="+this.props.login);
    this.props.loadOwnerSlots(this.props.serverUrl, this.props.login, this.props.password);
  }

  static navigationOptions = {
    title: 'Manage Parking Slots',
    drawerLabel: 'Manage Parking Slots',      
  }

  renderEdit=function(){
    if(this.state.showEdit){
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
                <TextInput 
                    style={styles.input}
                    onChangeText={this.changeArea.bind(this)}
                    value={this.props.areaId}/>                     
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
        data={this.props.slots}
        keyExtractor={slot => slot.name}
        renderItem={({item}) => <View style={styles.oneLine}><Text style={{ alignSelf: 'stretch'}}>{item.name}</Text><Icon.Button name="pencil" onPress={() => this.editSlot(item)}/><Icon.Button name="trash" onPress={() => this.deleteSlot(item)}/></View>}
      />
        <Button
            title="Add Slot "
            onPress={() => this.editSlot(null)}
        />
      </View>      
    );

  }

  changeName(name){   
    this.props.storeSlot (this.props.id,name,this.props.desc,this.props.areaId,this.props.owner);
  }
  changeDescription(desc){    
    this.props.storeSlot (this.props.id,this.props.name,desc,this.props.areaId,this.props.owner);
  }
  changeArea(areaId){    
    this.props.storeSlot (this.props.id,this.props.name,this.props.desc,areaId,this.props.owner);
  }
  saveSlot(){
    console.log("saving slot with id="+this.props.id+", name="+this.props.name+
    ", description="+this.props.desc+", areaId="+this.props.areaId);
    this.setState({
      showEdit:false
    });
    this.props.saveSlot(url,login,password,this.props.id,this.props.name,this.props.desc,this.props.areaId,this.props.login);
    this.props.loadOwnerSlots(url,login,password);
  }
  deleteSlot(slot){
    console.log("deleting slot with id="+this.props.id+", name="+this.props.name+
    ",description="+this.props.desc+", area="+this.props.areaId);
    //TODO
  }
  
  editSlot(slot){
    this.setState({
      showEdit:true,
    })
    if(slot==null){
        //new slot    
    }
    else{
      console.log("editing slot "+slot.name)
      this.props.getCurrentSlot(slot.name);
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
  slots: state.slotSettings.slots
})

function mapDispatchToProps(dispatch) {
  return({
    loadServerSettings: () => {dispatch(loadServerSettings())},
    storeSlot: (id, name, desc, areaId, owner) => {dispatch(storeSlot(id, name, desc, areaId, owner))},
    saveSlot: (url,login,pwd, id, name, desc, areaId, owner) => {dispatch(saveSlot(url,login,pwd, id, name, desc, areaId, owner))},
    loadOwnerSlots: (url,login,pwd) => {dispatch(loadOwnerSlots(url,login,pwd))},
    getCurrentSlot: (id) => {dispatch(getCurrentSlot(id))}
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(SlotManagement)
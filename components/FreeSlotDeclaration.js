import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList,Picker, Item} from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import {saveDecl,storeDecl,loadOwnerDecls,getCurrentDecl,deleteDecl} from '../actions/freeSlotDeclarationActions';
import {loadServerSettings} from '../actions/serverActions';
import {loadOwnerSlots} from '../actions/slotActions';
import {loadUsersWantSlot} from '../actions/userActions';
import { loadAreas } from '../actions/areaActions.js';
import DatePicker from 'react-native-datepicker';
import moment from "moment";

class FreeSlotDeclaration extends React.Component {
    
  static navigationOptions = {
    title: 'Do you have a free slot?',
    drawerLabel: 'Declare/manage a free slot!',      
  }
  constructor(props) {
    super(props);
    this.state={
      showEdit: false
    };
  }

  componentDidMount() {
    console.log("FreeSlotDeclaration componentDidMount");
    this.props.loadUsersWantSlot(this.props.serverUrl, this.props.login, this.props.password);
    console.log("loaded if user wants slot")
    this.props.loadOwnerSlots(this.props.serverUrl, this.props.login, this.props.password);
    console.log("loaded owner slots")
    this.props.loadOwnerDecls(this.props.serverUrl, this.props.login, this.props.password);
    console.log("loaded owner declarations")
  }


  renderEdit=function(){
    console.log("renderEdit")
    if(this.state.showEdit){
      //TODO: add list of potential tenants
        return(
            <View style={styles.container}>
                <Text>Slot: </Text>    
                <Picker
                  selectedValue={this.props.slotId}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.changeSlot(itemValue)}
                  >
                   {this.props.slots.map((slot) => {
                     return (<Picker.Item label={slot.name} value={slot.id} key={slot.id} />) 
                    })}
                </Picker>                         
                <Text>Start Date:</Text>
                <DatePicker 
                    onDateChange={(date) => {this.changeStartDate(date)}}
                    date={this.props.startDate}/>    
                <Text>End Date:</Text>
                <DatePicker 
                    onDateChange={(date) => {this.changeEndDate(date)}}
                    date={this.props.endDate}/>  
                <Text>Do you have prefered tenants?</Text>                      

                <Button
                  title="Save"
                  onPress={() => this.saveDecl()}
                  />
              <Button
                  title="Cancel"
                  onPress={() => this.cancelEdit()}
                  />
            </View>
        );
    }
}
/** TODO: show only future declarations  */

  render() {
    console.log("render, decls="+this.props.decls)
    decls  = this.props.decls;
    return (
      <View style={styles.container}>
        <Icon.Button name="menu" onPress={() => this.props.navigation.openDrawer()}/>
        <Text style={styles.title}>{FreeSlotDeclaration.navigationOptions.title}</Text>

        {this.renderEdit()}

        <Text>Your Free Slot Declarations:</Text>        
        <FlatList
        data={decls}
        keyExtractor={decl => decl.id}
        renderItem={({item}) => <View style={styles.oneLine}><Text style={{ alignSelf: 'stretch'}}>{item.startDate} to {item.endDate}</Text><Icon.Button name="pencil" onPress={() => this.editDecl(item)}/><Icon.Button name="trash" onPress={() => this.deleteDecl(item)}/></View>}
      />
        <Button
            title="Add Declaration"
            onPress={() => this.editDecl(null)}
        />
        <Button
          title="Home"
          onPress={() =>this.props.navigation.navigate('Home')
          }
        />
      </View> 
    );     

  }

  changeStartDate(startDate){   
    console.log("storing startDate "+startDate);
    this.props.storeDecl (this.props.id, this.props.owner, this.props.slotId, startDate, this.props.endDate, this.props.preferedTenants);
  }
  changeEndDate(endDate){   
    this.props.storeDecl (this.props.id, this.props.owner, this.props.slotId, this.props.startDate, endDate, this.props.preferedTenants);
  }  
  changeSlot(slotId){    
    console.log("change slot "+slotId);
    this.props.slotId=slotId;
    this.props.storeDecl (this.props.id, this.props.owner, slotId, this.props.startDate, this.props.endDate, this.props.preferedTenants);
  }
  saveDecl(){
    console.log("saving declaration")
    if(this.props.slotId==null){
      this.props.slotId=this.props.slots[0].slotId
    }

    console.log("saving declaration id="+this.props.id+", slotId="+this.props.slotId+", startDate="+this.props.startDate+", endDate="+this.props.endDate+", preferedTenants="+this.props.preferedTenants);
    this.setState({
      showEdit:false
    });
    this.props.saveDecl(this.props.serverUrl,this.props.login,this.props.password,this.props.id, this.props.owner, this.props.slotId, this.props.startDate, this.props.endDate, this.props.preferedTenants);
  }
  cancelEdit(){
    console.log("cancelEdit")
    this.setState({
      showEdit:false,
    })
    this.resetCurrentDecl();
  }


  resetCurrentDecl(){
    console.log("resetting current decl");
    this.props.id=null;
    this.props.owner=null;
    this.props.startDate=moment();
    this.props.endDate=moment();
    this.props.preferedTenants=null;
    this.props.storeDecl(null,null,null,null,null,null);
  }
  
  editDecl(decl){ 
    console.log("editing current decl")
    if(decl==null){
        //new decl
        console.log("creating new decl");   
        this.resetCurrentDecl(); 
    }
    else{
      console.log("editing decl "+decl.id+", startDate="+decl.startDate)
      this.props.getCurrentDecl(decl.id);
    } 
    this.setState({
      showEdit:true,
    })
  }

  deleteDecl(decl){
    if(decl==null){
      console.log("deleting but no decl selected");    
    }
    else{
      console.log("deleting decl "+decl.id+", startDate="+decl.startDate)
      this.props.deleteDecl(this.props.serverUrl,this.props.login,this.props.password, decl.id);
    } 
  }
}

const mapStateToProps = state => ({
  serverUrl: state.serverSettings.serverUrl,
  login: state.serverSettings.login,
  password : state.serverSettings.password,
  id: state.freeSlotDeclarationStore.id,
  owner: state.freeSlotDeclarationStore.owner,
  slotId: state.freeSlotDeclarationStore.slotId,
  startDate: state.freeSlotDeclarationStore.startDate,
  endDate: state.freeSlotDeclarationStore.endDate,
  preferedTenants: state.freeSlotDeclarationStore.preferedTenants,
  decls: state.freeSlotDeclarationStore.decls,
  slots:state.slotSettings.slots,
  users: state.userStore.users,
})

function mapDispatchToProps(dispatch) {
  return({
    loadServerSettings: () => {dispatch(loadServerSettings())},
    storeDecl: (id, owner, slotId, startDate, endDate, preferedTenants) => {dispatch(storeDecl(id, owner, slotId, startDate, endDate, preferedTenants))},
    saveDecl: (url,login,pwd, id, owner, slotId, startDate, endDate, preferedTenants) => {dispatch(saveDecl(url,login,pwd, id, slotId, startDate, endDate, preferedTenants))},
    loadOwnerDecls: (url,login,pwd) => {dispatch(loadOwnerDecls(url,login,pwd))},
    deleteDecl: (url,login,pwd, id) => {dispatch(deleteDecl(url,login,pwd, id))},
    getCurrentDecl: (id) => {dispatch(getCurrentDecl(id))},
    loadOwnerSlots: (url,login,pwd) => {dispatch(loadOwnerSlots(url,login,pwd))},
    loadUsersWantSlot: (url,login,pwd) => {dispatch(loadUsersWantSlot(url,login,pwd))}
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(FreeSlotDeclaration)
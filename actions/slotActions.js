import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_SLOT, STORE_SLOTS,STORE_SLOT_AND_SLOTS} from './actions';
import {buildToken} from './serverActions'

/** simple action creators*/

export function storeSlot(id, name, desc, areaId, owner){
  return {
    type: STORE_SLOT,
    slotId: id,
    slotName: name,
    slotDescription: desc,
    slotAreaId: areaId,
    slotOwner: owner
  }
}

export function storeSlots(slots){
  return {
    type: STORE_SLOTS,
    slots: slots
  }
}

export function storeSlotAndSlots(id, name, desc, areaId, owner, slots){
  return {
    type: STORE_SLOT_AND_SLOTS,
    slotId: id,
    slotName: name,
    slotDescription: desc,
    slotAreaId: areaId,
    slotOwner: owner,
    slots: slots
  }
}


/** action creators with logic */

/**
 * Simple function to update the full list of slots from the slot that was updated
 */
function updateSlotsList(id, name, desc, areaId, owner, slots){
    console.log("updateStoredSlots from slot id="+id+", slots length="+slots.length);
    var newSlots=[];
    //update slots list    
    var found=false;
    for(i=0;i<slots.length;i++){
      slot=slots[i];           
      var newSlot={id: slot.id};
      if(slot.id==id){
        newSlot.name=name;
        newSlot.desc=desc;
        newSlot.areaId=areaId;
        newSlot.owner=owner;
        found=true;
      }
      else{
        newSlot.name=slot.name;
        newSlot.desc=slot.desc;
        newSlot.areaId=slot.areaId;
        newSlot.owner=slot.owner;
      }
      console.log("adding slot "+JSON.stringify(newSlot));
      newSlots.push(newSlot);
    }
    //if not found: new slot to be added
    if(!found){
      var newSlot={id: slot.id};
      newSlot.name=name;
      newSlot.desc=desc;
      newSlot.areaId=areaId;
      newSlot.owner=owner;
      newSlots.push(newSlot);
    }

    message="updating slots to [";    
    for(i=0;i<newSlots.length;i++){
      slot= newSlots[i];
      message=message+"{id="+slot.id+", name="+slot.name+", desc="+slot.desc+", areaId="+slot.areaId+", owner="+slot.owner+"),";
    } 
    console.log(message+"]");
    return newSlots;
}

export function saveSlot(serverUrl, login, password, id, name, desc, areaId, owner) {
  return (dispatch,getState) => {
    //TODO: separate createSlot !
    console.log("saving slot id="+id+", name="+name+", desc="+desc+", areaId="+areaId+", owner="+owner);
    if(id){ // Update slot
      fetch(serverUrl+'/parkingSlot/'+id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': buildToken(login, password)
        },
        body: JSON.stringify({
          name: name,
          desc: desc,
          areaId: areaId,
          owner: owner
        }),
      })
      .then(
        (result) => {      
          if(result.status>=200 && result.status<300 && result.ok==true){   
            console.log("saved slot OK, result="+JSON.stringify(result));
            const {slots}=getState().slotSettings;
            var newSlots=updateSlotsList(id, name, desc, areaId, owner, slots);
            dispatch(storeSlotAndSlots(id, name, desc, areaId, owner,newSlots));
            return result;
          }
          else{
            console.log("an error occured while saving slot: "+JSON.stringify(result));
          }
        })
        .catch((error) => {
          console.error("error while saving slot: "+error);
        });
    }
    else{
      //No ID=creating new slot
      fetch(serverUrl+'/parkingSlot', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': buildToken(login, password)
        },
        body: JSON.stringify({
          name: name,
          desc: desc,
          areaId: areaId,
          owner: owner
        }),
      })
      .then(response => response.json())
      .then((result) => {      
            console.log("created slot OK, result="+JSON.stringify(result));
            slot=result;  
            updateSlotId(slot);
            console.log("returned slot: "+JSON.stringify(slot));
            const {slots}=getState().slotSettings;
            var newSlots=updateSlotsList(slot.id, slot.name, slot.desc, slot.areaId, slot.owner, slots);
            dispatch(storeSlotAndSlots(slot.id, slot.name, slot.desc, slot.areaId, slot.owner,newSlots));
            return result;
        })
        .catch((error) => {
          console.error("error while creating slot: "+error);
        });
    }
  }
}

export function getIdFromUri(uri){
  var lastslashindex = uri.lastIndexOf('/');
  return uri.substring(lastslashindex  + 1);
}

export function updateSlotId(slot){
  uri=slot._links.self.href;
  id=getIdFromUri(uri);
  slot.id=id;
}

export function loadSlot(serverUrl, login, password, id){
  return (dispatch,getState) => {
    fetch(serverUrl+'parkingSlot/'+id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      }
    })
    .then(
      (result) => {   
          slot=result.json()._embedded.parkingSlot;      
          dispatch(storeSlot(id, slot.name, slot.desc, slot.areaId, slot.owner));
          return result;
      })
      .catch((error) => {
        console.error(error);
      });
    }
}

export function getCurrentSlot(id){
  return (dispatch,getState) => {
      //find by id in slots list
      const {slots}=getState().slotSettings;
      console.log("list of slots: "+JSON.stringify(slots));
      getById=function(slot){
        return slot.id==id;
      }
      slot=slots.find(getById); 
      console.log("found slot: "+JSON.stringify(slot)); 

      dispatch(storeSlot(slot.id, slot.name, slot.desc, slot.areaId, slot.owner));
      return slot;
    };
}


export function loadOwnerSlots(serverUrl, login, password){
  return (dispatch,getState) => {
    fetch(serverUrl+'/parkingSlot/search/findAllByOwner?owner='+login, {              
      method: 'GET',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then(response => response.json())
    .then((response) => {  
          console.log("loadOwnerSlots for owner "+login+", status="+response.status+", result="+JSON.stringify(response));
          
          if(response.status<200 && response.status>=300){
            console.log("an error occured !");
          }
          else{
            slots=response._embedded.parkingSlot;  
            console.log("loaded slots: "+slots.length);    

            var newSlots = slots.map(function(s) { 
              updateSlotId(s);
              return s;
            });

            dispatch(storeSlots(newSlots));
            console.log("stored owner slots");
            return response;
          }
      })
      .catch((error) => {
        console.error(error);
      });
    }

}


export function deleteSlot(serverUrl, login, password, id){
  return (dispatch,getState) => {
    fetch(serverUrl+'/parkingSlot/'+id, {              
      method: 'DELETE',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then(response => response.json())
    .then((response) => {  
          console.log("deleteSlot for owner "+login+", status="+response.status+", result="+JSON.stringify(response));
          
          if(response.status<200 && response.status>=300){
            console.log("an error occured !");
          }
          else{
          console.log("deleted slot");    
          dispatch(loadOwnerSlots(serverUrl, login, password));
          return response;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

}
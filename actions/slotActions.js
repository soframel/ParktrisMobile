import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_SLOT, STORE_SLOTS} from './actions';
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


/** action creators with logic */

export function saveSlot(serverUrl, login, password, id, name, desc, areaId, owner) {
  return (dispatch,getState) => {
    console.log("saving slot id="+id+", name="+name+", desc="+desc+", areaId="+areaId+", owner="+owner);
    fetch(serverUrl+'/parkingSlot', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      },
      body: JSON.stringify({
        id: id,
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
          uri=result.headers.map.location[0];
          id=getIdFromUri(uri);
          dispatch(storeSlot(id, name, desc, areaId, owner));
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
}

export function getIdFromUri(uri){
  var lastslashindex = uri.lastIndexOf('/');
  return uri.substring(lastslashindex  + 1);
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
          dispatch(storeSlot(slot.id, slot.name, slot.desc, slot.areaId, slot.owner));
          return result;
      })
      .catch((error) => {
        console.error(error);
      });
    }
}

/**
 * TODO: complete. Current slots where not loaded ?
 */
export function getCurrentSlot(id){
  return (dispatch,getState) => {
      //find by id in slots list
      const {slots}=getState().slotSettings;
      console.log("list of slots: "+JSON.stringify(slots));
      getById=function(slot){
        return slot.name==id;
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
          dispatch(storeSlots(slots));
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
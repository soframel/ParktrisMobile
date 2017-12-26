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
    fetch(serverUrl+'parkingSlot', {
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
          dispatch(storeSlot(id, name, desc, areaId, owner));
          return result;
      });
    }
}

export function loadSlot(serverUrl, login, password, id){
  return (dispatch,getState) => {
    fetch(serverUrl+'parkingSlot/'+id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      }
    })
    .then(
      (result) => {   
          slot=result.json()._embedded.parkingSlot;      
          dispatch(storeSlot(slot.id, slot.name, slot.desc, slot.areaId, slot.owner));
          return result;
      });
    }
}

export function getCurrentSlot(id){
  return (dispatch,getState) => {
      //find by id in slots list
      getById=function(slot){
        return s.id==id;
      }
      slot=slots.find(getById);  

      dispatch(storeSlot(slot));
      return result;
  }
}


export function loadOwnerSlots(serverUrl, login, password){
  return (dispatch,getState) => {
    fetch(serverUrl+'/parkingSlot/search/findAllByOwner?owner='+login, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      }
    })
    .then(
      (result) => {  
        json=result.json(); 
        console.log("result="+JSON.stringify(json));
          slots=json._embedded;  
          console.log("loaded slots: "+slots)    
          dispatch(storeSlots(slots));
          return result;
      });
    }
}
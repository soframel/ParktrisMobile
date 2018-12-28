import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_DECL, STORE_DECLS, STORE_DECL_AND_DECLS} from './actions';
import {buildToken} from './serverActions'
import moment from "moment";

/** simple action creators*/

export function storeDecl(id, owner, slotId, startDate, endDate, preferedTenants){
  return {
    type: STORE_DECL,
    id: id,
    owner: owner,
    slotId: slotId,
    startDate: startDate,
    endDate: endDate,
    preferedTenants: preferedTenants
  }
}

export function storeDecls(decls){
  return {
    type: STORE_DECLS,
    decls: decls
  }
}

export function storeDeclAndDecls(id, owner, slotId, startDate, endDate, preferedTenants, decls){
  return {
    type: STORE_DECL_AND_DECLS,
    id: id,
    owner: owner,
    slotId: slotId,
    startDate: startDate,
    endDate: endDate,
    preferedTenants: preferedTenants,
    decls: decls
  }
}


/** action creators with logic */

export function saveDecl(serverUrl, login, password, id, slotId, startDate, endDate, preferedTenants) {
  return (dispatch,getState) => {
   
    console.log("saving declaration id="+id+", slotId="+slotId+", startDate="+startDate+", endDate="+endDate+", preferedTenants="+preferedTenants);
    var method="POST"
    var url=serverUrl+'/declarations'
    if(id){ // Update decl
      url=serverUrl+'/declarations/'+id;
      method="PUT"
    }

      fetch(url, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': buildToken(login, password)
        },
        body: JSON.stringify({
          id: id,
          owner: login,
          slotId: slotId,
          startDate: startDate,
          endDate: endDate,
          preferedTenants: preferedTenants
        }),
      })
      .then((result) => {      
          if(result.status>=200 && result.status<300 && result.ok==true){   
            console.log("saved declaration OK, result="+JSON.stringify(result));
            decl=result;
            const {decls}=getState().freeSlotDeclarationStore;
            var newDecls=updateDeclarationsList(decl.id, login,slotId, startDate, endDate, preferedTenants, decls);
            dispatch(storeDeclAndDecls(id, login,slotId, startDate, endDate, preferedTenants, newDecls));
            return result;
          }
          else{
            console.log("an error occured while saving declaration: "+JSON.stringify(result));
          }
        })
        .catch((error) => {
          console.error("error while saving declaration: "+error);
        });          
}
}

/**
 * Simple function to update the full list of declarations from the declaration that was updated
 */
function updateDeclarationsList(id, owner,slotId, startDate, endDate, preferedTenants, decls){
    console.log("updateDeclarationsList from declaration id="+id+", decls length="+decls.length);
    var newDecls=[];
    //update declas list    
    var found=false;
    for(i=0;i<decls.length;i++){
      decl=decls[i];           
      var newDecl={id: decl.id};
      if(decl.id==id){
        newDecl.name=name;
        newDecl.owner=owner;
        newDecl.slotId=slotId;
        newDecl.startDate=startDate;
        newDecl.endDate=endDate;
        newDecl.preferedTenants=preferedTenants;
        found=true;
      }
      else{
        newDecl.name=decl.name;
        newDecl.owner=decl.owner;
        newDecl.slotId=decl.slotId;
        newDecl.startDate=decl.startDate;
        newDecl.endDate=decl.endDate;
        newDecl.preferedTenants=decl.preferedTenants;
      }
      console.log("adding declaration "+JSON.stringify(newDecl));
      newDecls.push(newDecl);
    }
    //if not found: new decl to be added
    if(!found){
      var newDecl={id: id};
      newDecl.name=name;
      newDecl.owner=owner;
      newDecl.slotId=slotId;
      newDecl.startDate=startDate;
      newDecl.endDate=endDate;
      newDecl.preferedTenants=preferedTenants;
      newDecls.push(newDecl);
    }

    message="updating decls to [";    
    for(i=0;i<newDecls.length;i++){
      decl= newDecls[i];
      message=message+"{id="+decl.id+"onwer="+decl.owner+", slotId="+decl.slotId+", startDate="+decl.startDate+", endDate="+decl.endDate+", preferedTenants="+decl.preferedTenants+"}";
    } 
    console.log(message+"]");
    return newDecls;
}



export function loadDecl(serverUrl, login, password, id){
  return (dispatch,getState) => {
    fetch(serverUrl+'declarations/'+id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      }
    })
    .then(
      (result) => {   
          decl=result;      
          dispatch(storeDecl(id, login,decl.slotId, decl.startDate, decl.endDate, decl.preferedTenants));
          return result;
      })
      .catch((error) => {
        console.error(error);
      });
    }
}

export function getCurrentDecl(id){
  return (dispatch,getState) => {
      //find by id in decls list
      const {decls}=getState().freeSlotDeclarationStore;
      console.log("list of decls: "+JSON.stringify(decls));
      getById=function(decl){
        return decl.id==id;
      }
      decl=decls.find(getById); 
      console.log("found decl: "+JSON.stringify(decl)); 

      dispatch(storeDecl(id, decl.owner,decl.slotId, decl.startDate, decl.endDate, decl.preferedTenants));
      return decl;
    };
}


export function loadOwnerDecls(serverUrl, login, password){
  return (dispatch,getState) => {
    fetch(serverUrl+'/declarations?owner='+login, {              
      method: 'GET',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then(response => response.json())
    .then((response) => {  
          console.log("loadOwnerDecls for owner "+login+", status="+response.status+", result="+JSON.stringify(response));
          
          if(response.status<200 && response.status>=300){
            console.log("an error occured !");
          }
          else{
            decls=response;  
            console.log("loaded decls: "+decls.length);    

            dispatch(storeDecls(decls));
            console.log("stored owner decls");
            return response;
          }
      })
      .catch((error) => {
        console.error(error);
      });
    }

}


export function deleteDecl(serverUrl, login, password, id){
  return (dispatch,getState) => {
    console.log("deleteDecl for owner "+login+", id="+id);
    fetch(serverUrl+'/declarations/'+id, {              
      method: 'DELETE',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then((response) => {  
          console.log("deleteDecl result for owner "+login+", status="+response.status);
          
          if(response.status<200 && response.status>=300){
            console.log("an error occured !");
          }
          else{
          console.log("deleted decl");    
          const {decls}=getState().freeSlotDeclarationStore;
          const newDecls = decls.filter(s => s.id !=id);
          dispatch(storeDecls(newDecls));

          return response;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
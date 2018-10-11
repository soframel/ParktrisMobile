import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_AREAS} from './actions';
import {buildToken} from './serverActions'

/** simple action creators*/


export function storeAreas(areas){
  return {
    type: STORE_AREAS,
    areas: areas
  }
}

/** action creators with logic */

export function loadAreas(serverUrl, login, password){
  return (dispatch,getState) => {
    fetch(serverUrl+'/areas', {              
      method: 'GET',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then(response => response.json())
    .then((response) => {  
          console.log("loadAreas, status="+response.status+", result="+JSON.stringify(response));
          
          if(response.status>200){
            console.log("an error occured !");
          }
          else{
          areas=response;  
          console.log("loaded areas: "+areas.length); 
          // areas.map((area) => {
          //   uri=area._links.self.href;
          //   var lastslashindex = uri.lastIndexOf('/');
          //   area.id=uri.substring(lastslashindex  + 1);
          // });   
          dispatch(storeAreas(areas));
          console.log("stored areas: "+JSON.stringify(areas));
          return response;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
}
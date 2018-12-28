import {STORE_WANTSLOT_USERS} from './actions';
import {buildToken} from './serverActions'

/** simple action creators*/

export function storeUsersWantSlot(users){
  return {
    type: STORE_WANTSLOT_USERS,
    users: users
  }
}


/** action creators with logic */

export function loadUsersWantSlot(serverUrl, login, password){
  return (dispatch,getState) => {
    console.log("fetching users that want a slot");
    fetch(serverUrl+'/users/wantSlot', {              
      method: 'GET',
      headers: {
        'Authorization': buildToken(login, password)
      }
    })
    .then(response => response.json())
    .then((response) => {  
          console.log("loadUsersWantSlot for owner "+login+", status="+response.status+", result="+JSON.stringify(response));
          
          if(response.status<200 && response.status>=300){
            console.log("an error occured !");
          }
          else{
            users=response;  
            console.log("loaded users: "+users.length+": "+JSON.stringify(users));    

            dispatch(storeUsersWantSlot(users));
            console.log("stored users that want slots");
            return response;
          }
      })
      .catch((error) => {
        console.error(error);
      });
    }

}


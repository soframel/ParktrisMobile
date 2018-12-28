import {STORE_WANTSLOT_USERS}from '../actions/actions';

export const userStore = (state, action) => {
  switch (action.type) {    
    case STORE_WANTSLOT_USERS:{
        console.log("storing users: "+JSON.stringify(action));
        return {
            users: action.users
          }
    }
    default:{
        if(typeof state === "undefined"){
            return {
               users: null
              }
        }
        else{
            return state;
        }
    }
  }
}

export default userStore;
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_LOGIN,STORE_URL,STORE_PWD} from './actions';

/** simple action creators*/

export function storeUrl(newServerUrl){
  return {
    type: STORE_URL,
    serverUrl: newServerUrl,
  }
}

export function storeLogin(newLogin){
  return {
    type: STORE_LOGIN,
    login: newLogin,
  }
}


export function storePassword(newPwd){
  return {
    type: STORE_PWD,
    password: newPwd,
  }
}


/** action creators with logic */

export function loadUrl() {
  return (dispatch,getState) => {
      AsyncStorage.getItem('@Parktris:serverURL').then(
      (result) => {         
            console.log("loaded serverUrl=" + result);
          dispatch(storeUrl(result));
          return result;

      });
    }
}

export function loadLogin() {
  return (dispatch,getState) => {
      AsyncStorage.getItem('@Parktris:login').then(
      (result) => {         
            currentLogin=result;
            console.log("loaded login=" + currentLogin);
     
          dispatch(storeLogin(currentLogin));
          return result;

      });
    }
}

export function loadPassword() {
  return (dispatch,getState) => {
      AsyncStorage.getItem('@Parktris:password').then(
      (result) => {         
            currentPwd=result;
            console.log("loaded password");
     
          dispatch(storePassword(currentPwd));
          return result;

      });
    }
}

export function saveUrl(serverUrl) {
  return (dispatch,getState) => {
      AsyncStorage.setItem('@Parktris:serverURL',serverUrl).then(
      (result) => { 
        
            console.log("saved URL "+serverUrl);
     
          dispatch(storeUrl(serverUrl));
          return result;
      });
    }
}

export function saveLogin(login) {
  return (dispatch,getState) => {
      AsyncStorage.setItem('@Parktris:login',login).then(
      (result) => { 
        
            console.log("saved login "+login);
     
          dispatch(storeLogin(login));
          return result;
      });
    }
}

export function savePassword(pwd) {
  return (dispatch,getState) => {
      AsyncStorage.setItem('@Parktris:passord',pwd).then(
      (result) => { 
        
            console.log("saved pwd ");
     
          dispatch(storePassword(pwd));
          return result;
      });
    }
}

// export function checkConnection(serverUrl, login, password) {
//   console.log("checking connection to server " + serverUrl + " with login " + login);
//   //TODO: add timeout when it is supported by API !
//   return fetch(serverUrl + '/parkingArea', {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': this.buildToken()
//     }
//   });

//       //return the action for the store
//       return {
//         type: LOAD_SETTINGS,
//         serverUrl: currentUrl,
//         login: currentLogin,
//         password: currentPwd,
//         connectionStatus: "LOADING"
//       }
// }

function buildToken() {
  return "Basic " + base64.encode(this._login + ":" + this._password);
}
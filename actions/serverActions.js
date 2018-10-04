import base64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {STORE_LOGIN,STORE_URL,STORE_PWD,STORE_ALL,STORE_STATUS,STATUS_ERROR,STATUS_OK,STATUS_UNKNOWN} from './actions';

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

export function storeAll(url, login, pwd){
  return {
    type: STORE_ALL,
    serverUrl: url,
    login: login,
    password: pwd
  }
}

export function storeStatus(status){
  return {
    type: STORE_STATUS,
    status: status
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
            if(currentPwd!=null && currentPwd.length>0){
              console.log("loaded password "+currentPwd.substring(0,1)+"...");
            }
            else{
              console.log("loaded password but it is empty!");
            }
     
          dispatch(storePassword(currentPwd));
          return result;

      });
    }
}

export function loadServerSettings(){
  return (dispatch,getState) => {
    AsyncStorage.getItem('@Parktris:serverURL').then(
      (result) => {         
          serverUrl=result;
          console.log("loaded serverUrl=" + serverUrl);
          AsyncStorage.getItem('@Parktris:login').then(
            (result2) => {         
                  login=result2;
                  console.log("loaded login=" + login);
                  AsyncStorage.getItem('@Parktris:password').then(
                    (result3) => {         
                          pwd=result3;
                          if(pwd!=null && pwd.length>0){
                            console.log("loaded password "+pwd.substring(0,1)+"...");
                          }
                          else{
                            console.log("loaded password but it is empty!");
                          }
                   
                        dispatch(storeAll(serverUrl, login, pwd));
                        return result3;
                    })
                  })
                });
  };
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
      AsyncStorage.setItem('@Parktris:password',pwd).then(
      (result) => { 
        if(pwd!=null && pwd.length>0){
          console.log("saved password "+pwd.substring(0,1)+"...");
        }
        else{
          console.log("saved password but it is empty!");
        }
     
          dispatch(storePassword(pwd));
          return result;
      });
    }
}

export function checkConnection(serverUrl, login, password) {
  return (dispatch,getState) => {
    console.log("checking connection to server " + serverUrl + " with login " + login);
    //TODO: add timeout when it is supported by API !
    return fetch(serverUrl + '/parkingArea', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': buildToken(login, password)
      }
    }).then(
      (result) => {
        if(result.status>=200 && result.status<300 && result.ok==true){
          console.log("connection ok: "+JSON.stringify(result));
          dispatch(storeStatus(STATUS_OK));
        }
        else{
          console.log("an error occured: "+JSON.stringify(result));
          dispatch(storeStatus(STATUS_ERROR));
        }
      }
    )
    .catch(
      (error)=>{
        console.log("connection problem"+error);
        dispatch(storeStatus(STATUS_ERROR));
      }
    );
  }
}

export function buildToken(login, password) {
  token= "Basic " + base64.encode(login + ":" + password);
  console.log("token="+token);
  return token;
}
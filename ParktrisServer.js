import React from 'react';
import base64 from 'base-64';

/**
 * toto: change to singleton instead of static functions?
 */
export default class ParktrisServer{

    static buildToken(user, password){
        return "Basic "+base64.encode(user+":"+password);
    }

    static checkConnection(serverUrl, user, password){
        console.log("checking connection to server "+serverUrl+" with login "+user);
        //TODO: add timeout when it is supported by API !
        return fetch(serverUrl+'/parkingArea', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': ParktrisServer.buildToken(user,password)
            }           
          })
          /* .then((responseJson) => { 
              console.log("checkConnection ok");
              return true; 
            })
          .catch((error) => { 
            console.log("checkConnection error="+error); 
            return false; }); */
      }

}
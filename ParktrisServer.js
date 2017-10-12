import React from 'react';
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

let instance = null;

export default class ParktrisServer{
  _serverUrl=null;
  _login=null;
  _password=null;

  constructor() {
    if(!instance){
          instance = this;
    }

    this.loadCredentials();
    return instance;
  }
  
  loadCredentials(){
      AsyncStorage.getItem('@Parktris:serverURL').then((token) => {
        this._serverUrl=token;
      });
      AsyncStorage.getItem('@Parktris:login').then((token) => {
       this._login=token;
      });
      AsyncStorage.getItem('@Parktris:password').then((token) => {
        this._password=token;
      });
  }
  getServerURL(){
    return this._serverUrl;
  }
  getUser(){
    return this._user;
  }
  getPassword(){
    return this._password;
  }
  
  async changeURL(url){
    this._serverUrl=url;
    try {
      await AsyncStorage.setItem('@Parktris:serverURL', url);
    } catch (error) {
      console.log("error while saving serverURL: "+error)
    }
  }
  async changeLogin(login){
    this._login=login;
    try {
      await AsyncStorage.setItem('@Parktris:login', login);
    } catch (error) {
      console.log("error while saving login: "+error)
    }
  }
  async changePassword(pwd){
    this._password=pwd;
    try {
      await AsyncStorage.setItem('@Parktris:password', pwd);
    } catch (error) {
      console.log("error while saving password: "+error)
    }
  }

    buildToken(){
        return "Basic "+base64.encode(this._login+":"+this._password);
    }

    checkConnection(){
        console.log("checking connection to server "+this._serverUrl+" with login "+this._login);
        //TODO: add timeout when it is supported by API !
        return fetch(this._serverUrl+'/parkingArea', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.buildToken()
            }           
          })

      }

}
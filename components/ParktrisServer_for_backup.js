import React from 'react';
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

let instance = null;

export default class ParktrisServer {
  _serverUrl = null;
  _login = null;
  _password = null;

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async loadConfiguration() {
    AsyncStorage.getItem('@Parktris:serverURL').then((token) => {
      this._serverUrl = token;
      console.log("loaded serverUrl=" + this._serverUrl);
    });
  
    AsyncStorage.getItem('@Parktris:login').then((token) => {
      this._login = token;
      console.log("loaded login=" + this._login);
    });
  
    AsyncStorage.getItem('@Parktris:password').then((token) => {
      this._password = token;
      console.log("loaded password: not null?"+(this._password!=null));
    });
  }
  getServerURL() {
    return this._serverUrl;
  }
  getLogin() {
    return this._login;
  }
  getPassword() {
    return this._password;
  }

  async changeURL(url) {
    console.log("storing new url=" + url);
    this._serverUrl = url;
    try {
      await AsyncStorage.setItem('@Parktris:serverURL', url);
    } catch (error) {
      console.log("error while saving serverURL: " + error)
    }
  }
  async changeLogin(login) {
    console.log("storing new login=" + login);
    this._login = login;
    try {
      await AsyncStorage.setItem('@Parktris:login', login);
    } catch (error) {
      console.log("error while saving login: " + error)
    }
  }
  async changePassword(pwd) {
    console.log("storing new password");
    this._password = pwd;
    try {
      await AsyncStorage.setItem('@Parktris:password', pwd);
    } catch (error) {
      console.log("error while saving password: " + error)
    }
  }
  async changeConfiguration(url,login,pwd) {
    console.log("storing new configuration: "+url+", "+login);
    this._serverUrl=url;
    this._login=login;
    this._password = pwd;
    try {
      await AsyncStorage.setItem('@Parktris:serverURL', url);
      await AsyncStorage.setItem('@Parktris:login', login);
      await AsyncStorage.setItem('@Parktris:password', pwd);
    } catch (error) {
      console.log("error while saving configuration: " + error)
    }
  }

  buildToken() {
    return "Basic " + base64.encode(this._login + ":" + this._password);
  }

  checkConnection() {
    console.log("checking connection to server " + this._serverUrl + " with login " + this._login);
    //TODO: add timeout when it is supported by API !
    return fetch(this._serverUrl + '/parkingArea', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.buildToken()
      }
    });
  }

  getParkingSlots(){
    console.log("getParkingSlots");
    return fetch(this._serverUrl + '/parkingArea', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.buildToken()
      }
    });
  }

}
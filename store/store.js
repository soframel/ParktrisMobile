import {STORE_LOGIN,STORE_URL,STORE_PWD,STORE_STATUS,STATUS_ERROR,STATUS_OK,STATUS_UNKNOWN}from '../actions/actions';

export const serverSettings = (state, action) => {
  switch (action.type) {    
    case STORE_URL:{
        console.log("storing url: "+action.serverUrl);
        return {
            serverUrl: action.serverUrl,
            login: state.login,
            password : state.password,
            connectionStatus: STATUS_UNKNOWN
        };
    }
    case STORE_LOGIN:{
        console.log("storing login: "+action.login);
        return {
            serverUrl: state.serverUrl,
            login: action.login,
            password : state.password,
            connectionStatus: STATUS_UNKNOWN
        };
    }
    case STORE_PWD:{
        console.log("storing password ");
        return {
            serverUrl: state.serverUrl,
            login: state.login,
            password : action.password,
            connectionStatus: STATUS_UNKNOWN
        };
    }
    case STORE_STATUS:{
        console.log("storing status "+action.status);
        return {
            serverUrl: state.serverUrl,
            login: state.login,
            password : state.password,
            connectionStatus: action.status
        };
    }
    default:{
        console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {serverUrl: "",login: "",password : "",connectionStatus:"UNKNOWN"};
        }
        else{
            return state;
        }
    }
  }
}

export default serverSettings;
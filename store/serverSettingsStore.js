import {STORE_LOGIN,STORE_URL,STORE_PWD,STORE_ALL,STORE_STATUS,STATUS_ERROR,STATUS_OK,STATUS_UNKNOWN}from '../actions/actions';

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
        var pwd=action.password;
        if(pwd!=null && pwd.length>0){
            console.log("storing password "+pwd.substring(0,1)+"...");
          }
          else{
            console.log("storing password but it is empty!");
          }
        return {
            serverUrl: state.serverUrl,
            login: state.login,
            password : action.password,
            connectionStatus: STATUS_UNKNOWN
        };
    }
    case STORE_ALL:{
        var shortPassword=(action.password!=null && action.password.length>0)?action.password.substring(0,1)+"...":"null";
        console.log("storing all: serverURL="+action.serverUrl+", login="+action.login+", password="+shortPassword);
        return {
            serverUrl: action.serverUrl,
            login: action.login,
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
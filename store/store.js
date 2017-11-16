import {STORE_LOGIN,STORE_URL,STORE_PWD}from '../actions/actions';

export const configureServer = (state, action) => {
  switch (action.type) {    
    case STORE_URL:{
        console.log("storing url: "+action.serverUrl);
        return {
            serverUrl: action.serverUrl,
            login: state.login,
            password : state.password,
        };
    }
    case STORE_LOGIN:{
        console.log("storing login: "+action.login);
        return {
            serverUrl: state.serverUrl,
            login: action.login,
            password : state.password,
        };
    }
    case STORE_PWD:{
        console.log("storing password ");
        return {
            serverUrl: state.serverUrl,
            login: state.login,
            password : action.password,
        };
    }
    default:{
        console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {serverUrl: "",login: "",password : ""};
        }
        else{
            return state;
        }
    }
  }
}

export default configureServer;
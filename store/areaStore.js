import {STORE_AREAS}from '../actions/actions';

export const areaSettings = (state, action) => {
  switch (action.type) {    
    case STORE_AREAS:{
        console.log("storing areas "+action.areas.length);
        return {
            areas: action.areas,
          }
    }
    default:{
        console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {
                areas: null
              }
        }
        else{
            return state;
        }
    }
  }
}

export default areaSettings;
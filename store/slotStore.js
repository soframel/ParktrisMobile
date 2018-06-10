import {STORE_SLOT, STORE_SLOTS}from '../actions/actions';

export const slotSettings = (state, action) => {
  switch (action.type) {    
    case STORE_SLOT:{
        console.log("storing slot: "+action.slotName);
        return {
            slotId: action.slotId,
            slotName: action.slotName,
            slotDescription: action.slotDescription,
            slotArea: action.slotArea,
            slotOwner: action.slotOwner,
            slots: state.slots
          }
    }
    case STORE_SLOTS:{
        console.log("storing slots "+action.slots.length);
        return {
            slots: action.slots,
            //leave current slot unchanged
            slotId: state.slotId,
            slotName: state.slotName,
            slotDescription: state.slotDescription,
            slotArea: state.slotArea,
            slotOwner: state.slotOwner
          }
    }
    default:{
        console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {
                slotId: null,
                slotName: "",
                slotDescription: "",
                slotArea: null,
                slotOwner: null,
                slots: null
              }
        }
        else{
            return state;
        }
    }
  }
}

export default slotSettings;
import {STORE_SLOT, STORE_SLOTS,STORE_SLOT_AND_SLOTS}from '../actions/actions';

export const slotSettings = (state, action) => {
  switch (action.type) {    
    case STORE_SLOT:{
        console.log("storing slot: "+JSON.stringify(action));
        return {
            slotId: action.slotId,
            slotName: action.slotName,
            slotDescription: action.slotDescription,
            slotAreaId: action.slotAreaId,
            slotOwner: action.slotOwner,
            slots: state.slots
          }
    }
    case STORE_SLOTS:{
        console.log("storing slots, length="+action.slots.length);
        return {
            slots: action.slots,
            //leave current slot unchanged
            slotId: state.slotId,
            slotName: state.slotName,
            slotDescription: state.slotDescription,
            slotAreaId: state.slotAreaId,
            slotOwner: state.slotOwner
          }
    }
    case STORE_SLOT_AND_SLOTS:{
        console.log("storing slot + slots, length="+action.slots.length);
        return {
            slots: action.slots,
            slotId: action.slotId,
            slotName: action.slotName,
            slotDescription: action.slotDescription,
            slotAreaId: action.slotAreaId,
            slotOwner: action.slotOwner,
          }
    }
    default:{
        //console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {
                slotId: null,
                slotName: "",
                slotDescription: "",
                slotAreaId: null,
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
import {STORE_DECL, STORE_DECLS, STORE_DECL_AND_DECLS}from '../actions/actions';

export const freeSlotDeclarationStore = (state, action) => {
  switch (action.type) {    
    case STORE_DECL:{
        console.log("storing declaration: "+JSON.stringify(action));
        return {
            id: action.id,
            owner: action.owner,
            slotId: action.slotId,
            startDate: action.startDate,
            endDate: action.endDate,
            preferedTenants: action.preferedTenants,
            decls: state.decls
          }
    }
    case STORE_DECLS:{
        console.log("storing declarations, length="+action.decls.length);
        return {
            id: state.id,
            owner: state.owner,
            slotId: state.slotId,
            startDate: state.startDate,
            endDate: state.endDate,
            preferedTenants: state.preferedTenants,
            decls: action.decls
          }
    }
    case STORE_DECL_AND_DECLS:{
        console.log("storing declaration + declarations, length="+action.decls.length);
        return {
            id: action.id,
            owner: action.owner,
            slotId: action.slotId,
            startDate: action.startDate,
            endDate: action.endDate,
            preferedTenants: action.preferedTenants,
            decls: action.decls
          }
    }
    default:{
        //console.log("default: returning state "+state+", action="+action.type);
        if(typeof state === "undefined"){
            return {
                id: null,
                owner: null,
                slotId: null,
                startDate: null,
                endDate: null,
                preferedTenants: null,
                decls: null
              }
        }
        else{
            return state;
        }
    }
  }
}

export default freeSlotDeclarationStore;
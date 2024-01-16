import { getInstancesTypes } from './actions/types/getInstancesTypes';
import {SELECTED_COLOR, DESELECTED_COLOR, TEMPLATE_COLOR} from './../utils/constants';

export const initialStateInstancesReducer = {
  allPotentialInstances : [],
  allLoadedInstances : [],
  focusedInstance : "",
  event : {},
  isLoading: false,
  error: false
};

const InstancesReducer = (state = initialStateInstancesReducer, response) => {
  switch (response.type) {
     case getInstancesTypes.GET_INSTANCES_STARTED: {
        return Object.assign({}, state, {
           isLoading: true
        })
      }
     case getInstancesTypes.GET_INSTANCES_SUCCESS:{
      const newInstance = { metadata : response.payload };
      newInstance.visible = true;
      if ( newInstance.metadata?.IsTemplate ){
        newInstance.color = TEMPLATE_COLOR;
      } else {
        newInstance.color = DESELECTED_COLOR;
      }
      let loadedInstances = state.allLoadedInstances?.find( i => i?.metadata?.Id === response.payload.Id ) ? [...state.allLoadedInstances] : [...state.allLoadedInstances, newInstance]
      return Object.assign({}, state, {
          allLoadedInstances: loadedInstances,
          focusedInstance : state.allLoadedInstances?.find( i => i?.metadata?.Id === response.payload.Id ),
          event : { action : getInstancesTypes.ADD_INSTANCE, id : response.payload.Id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.GET_INSTANCES_FAILURE:{
        return Object.assign({}, state, {
          error: true
        })
      }
      case getInstancesTypes.REMOVE_INSTANCES_SUCCESS:{
        return Object.assign({}, state, {
          allLoadedInstances: state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.query ) ? [...state.allLoadedInstances.filter(i => i.metadata?.Id !== response.payload.query)] : [...state.allLoadedInstances],
          event : { action : getInstancesTypes.REMOVE_INSTANCES_SUCCESS, id : response.payload.query, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.SHOW_3D_MESH:{
        const updateInstances = [...state.allLoadedInstances]
        const instance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        instance.visible = true;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.SHOW_3D_MESH, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.HIDE_3D_MESH:{
        const updateInst = [...state.allLoadedInstances]
        const match = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        match.visible = false;
        return Object.assign({}, state, {
          allLoadedInstances: updateInst,
          event : { action : getInstancesTypes.HIDE_3D_MESH, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.CHANGE_COLOR:{
        const updateInst = [...state.allLoadedInstances]
        const match = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        match.color = response.payload.color;
        return Object.assign({}, state, {
          allLoadedInstances: updateInst,
          event : { action : getInstancesTypes.CHANGE_COLOR, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.FOCUS_INSTANCE:{
        const findInstance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        return Object.assign({}, state, {
          focusInstance: findInstance,
          event : { action : getInstancesTypes.FOCUS_INSTANCE, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.SELECT_INSTANCE:{
        const updateInstances = [...state.allLoadedInstances]
        updateInstances?.forEach( i => { 
          if ( i.Id === response.payload.id ) {
            i.selected = !i.selected;
            if ( i.selected ) i.color = SELECTED_COLOR;
          }
        });
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.SELECT_INSTANCE, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.GET_3D_OBJ_TYPE_STARTED:
        return Object.assign({}, state, {
        isLoading: true
      })
      case getInstancesTypes.GET_3D_OBJ_TYPE_SUCCESS:
        return Object.assign({}, state, {
          instanceOnFocus: response.payload,
          allLoadedInstances: state.visibleInstances?.find( i => i.Id === response.payload.Id ) ? [...state.visibleInstances] : [...state.visibleInstances, response.payload],
          isLoading: false
        })
      case getInstancesTypes.GET_3D_OBJ_TYPE_FAILURE:
        return Object.assign({}, state, {
          instanceOnFocus: response.payload.error,
          error: true
        })
      case getInstancesTypes.ADD_SKELETON:{
        const updateInstances = [...state.allLoadedInstances]
        const instance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        if ( instance?.skeleton ) instance.skeleton.visible = true;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.ADD_SKELETON, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.SHOW_SKELETON:{
        const updateInstances = [...state.allLoadedInstances]
        const match = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        if ( match?.skeleton ) match.skeleton.visible = true;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.SHOW_SKELETON, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.HIDE_SKELETON:{
        const updateInstances = [...state.allLoadedInstances]
        const instance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        if ( instance?.skeleton ) instance.skeleton.visible = false;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.HIDE_SKELETON, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.SHOW_CYLINDERS:{
        const updateInstances = [...state.allLoadedInstances]
        const instance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        instance.skeleton.visible = true;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.SHOW_CYLINDERS, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
      case getInstancesTypes.SHOW_LINES:{
        const updateInstances = [...state.allLoadedInstances]
        const instance = state.allLoadedInstances?.find( i => i.metadata?.Id === response.payload.id );
        instance.skeleton.visible = true;
        return Object.assign({}, state, {
          allLoadedInstances:updateInstances,
          event : { action : getInstancesTypes.SHOW_LINES, id : response.payload.id, trigger : Date.now()},
          isLoading: false
        })
      }
     default:
        return state;
  }
}

export default InstancesReducer;

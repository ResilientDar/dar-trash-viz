import { store } from './store'
import * as Constants from '../constants'


export function addActiveLayer(layer){
	store.dispatch(addActiveLayerAction(
		layer));
}

export function removeActiveLayer(layer){
	store.dispatch(removeActiveLayerAction(
		layer));
}

export function addActiveLayerAction(layer){
	return {
	    type: Constants.ADD_LAYER,
	    layer
	  }
}

export function removeActiveLayerAction(layer){
	return {
	    type: Constants.REMOVE_LAYER,
	    layer
	  }
}

export function setClusterActive(clusterActive){
	store.dispatch(setClusterActiveAction(
		clusterActive));
}

export function setClusterActiveAction(clusterActive){
	return {
	    type: Constants.SET_CLUSTER_ACTIVE,
	    clusterActive
	  }
}
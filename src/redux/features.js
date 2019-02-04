import { store } from './store'
import * as Constants from '../constants'


export function setCurrentFeature(currentFeature, infoActive){
	store.dispatch(setCurrentFeatureAction(
		currentFeature,
		 infoActive));
}

export function setCurrentFeatureAction(currentFeature, infoActive){
	return {
	    type: Constants.SET_CURRENT_FEATURE,
	    currentFeature,
	    infoActive
	  }
}

export function setFeatures(features){
	store.dispatch(setFeatureAction(
		features));
}

export function setFeatureAction(features){
	return {
	    type: Constants.SET_FEATURES,
	    features
	  }
}

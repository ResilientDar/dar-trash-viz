import { store } from './store'
import * as Constants from '../constants'


export function setCurrentFeature(currentFeature, infoActive){
	store.dispatch(setCurrentFeatureAction(
		currentFeature,
		 infoActive));
}

export function setCurrentFeatureAction(currentFeature, infoActive){
	return {
	    type: Constants.SET_FEATURES,
	    currentFeature,
	    infoActive
	  }
}

export default setCurrentFeature;
import { store } from './store'
import * as Constants from '../constants'


function setCurrentFeature(currentFeature, infoActive){
	store.dispatch({
	    type: Constants.SET_FEATURES,
	    currentFeature,
	    infoActive
	  });
}

export default setCurrentFeature;
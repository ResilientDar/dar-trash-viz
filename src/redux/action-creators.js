import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ACTIVE_OPTION,
    option
  });
}

export function setCurrentFeatureParent(currentFeature){
	console.log("called from actions");
	store.dispatch({
	    type: Constants.SET_FEATURES,
	    currentFeature
	  });
}

export function setActiveLegendOption(option) {
  store.dispatch({
    type: Constants.SET_LEGEND_ACTIVE_OPTION,
    option
  });
}

import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ACTIVE_OPTION,
    option
  });
}

<<<<<<< HEAD
export function setCurrentFeatureParent(currentFeature){
	store.dispatch({
	    type: Constants.SET_FEATURES,
	    currentFeature
	  });
}

=======
export function setFeatures(features_){
  return {
    type: Constants.SET_FEATURES,
   features_
  }
>>>>>>> eca7eb19c2e7bc2f07a0665abdd22df9630f275a
export function setActiveLegendOption(option) {
  store.dispatch({
    type: Constants.SET_LEGEND_ACTIVE_OPTION,
    option
  });
}

export function setInfoActive(option) {
  store.dispatch({
    type: Constants.SET_INFO_ACTIVE,
    option
  });
}


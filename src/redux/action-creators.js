import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ACTIVE_OPTION,
    option
  });
}

export function setFeatures(features_){
  return {
    type: Constants.SET_FEATURES,
   features_
  }
export function setActiveLegendOption(option) {
  store.dispatch({
    type: Constants.SET_LEGEND_ACTIVE_OPTION,
    option
  });
}

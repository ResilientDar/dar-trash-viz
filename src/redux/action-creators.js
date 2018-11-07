import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ACTIVE_OPTION,
    option
  });
}

export function setAnalysisActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ANALYSIS_ACTIVE_OPTION,
    option
  });
}

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


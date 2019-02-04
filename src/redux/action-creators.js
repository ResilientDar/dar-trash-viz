import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch(setActiveOptionAction(option));
}

export function setAnalysisActiveOption(option) {
  store.dispatch(setAnalysisActiveOptionAction(option));
}

export function setLegendActiveOption(option) {
  store.dispatch(setLegendActiveOptionAction(option));
}

export function setInfoActive(
  infoActive, 
  showModalImg,
  zoomToFeature) {

  store.dispatch(setInfoActiveAction(
  infoActive, 
  showModalImg,
  zoomToFeature));
}

export function changeMoreAnalysis(option) {
  store.dispatch(changeMoreAnalysisAction(option));
}

export function setMoreStats(option) {
  store.dispatch(moreStatsAction(option));
}

export function setActiveOptionAction(option){
  return {
    type: Constants.SET_ACTIVE_OPTION,
    option
  }
}

export function setAnalysisActiveOptionAction(option){
  return {
    type: Constants.SET_ANALYSIS_ACTIVE_OPTION,
    option
  }
}

export function setLegendActiveOptionAction(option){
  return {
    type: Constants.SET_LEGEND_ACTIVE_OPTION,
    option
  }
}

export function setInfoActiveAction(
  infoActive, 
  showModalImg,
  zoomToFeature){
  return {
    type: Constants.SET_INFO_ACTIVE,
    infoActive,
    showModalImg,
    zoomToFeature
  }
}

export function changeMoreAnalysisAction(moreAnalysis){
  return {
    type: Constants.CHANGE_MORE_ANALYSIS,
    moreAnalysis
  }
}

export function moreStatsAction(moreStats){
  return {
    type: Constants.SET_MORE_STATS_OPTION,
    moreStats
  }
}

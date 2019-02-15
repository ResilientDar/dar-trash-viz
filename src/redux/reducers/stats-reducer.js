import * as Constants from '../../constants'
import * as Helpers from '../../util/helpers'

const initialState = {
  showNotification: true,
  moreStats: false,
  features: [],
  layers: [],
  activeLayers: [],
  analysisActiveLayers: [],
  clusterActive: false
};

function statsReducer(state = initialState, action) {

  switch (action.type) {
    case Constants.SET_MORE_STATS_OPTION:
      return Object.assign({}, state, {
        moreStats: action.moreStats,
      });
    case Constants.ADD_LAYER:
      return Object.assign({}, state, {
        activeLayers: Helpers.addLayer(
          state.activeLayers, 
          action.layer)
      });
    case Constants.REMOVE_LAYER:
      return Object.assign({}, state, {
        activeLayers: Helpers.removeLayer(
          state.activeLayers, 
          action.layer)
      });
    case Constants.SET_FEATURES:
      return Object.assign({}, state, {
        features: action.features,
      });
    case Constants.SET_CLUSTER_ACTIVE:
      return Object.assign({}, state, {
        clusterActive: action.clusterActive
      });
    
    default:
      return state;
  }
}

export { statsReducer, initialState };

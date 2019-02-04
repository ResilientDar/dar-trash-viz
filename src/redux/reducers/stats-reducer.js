import * as Constants from '../../constants'

const initialState = {
  showNotification: false,
  moreStats: false,
  features: null,
  layers: [],
  activeLayers: [],
  analysisActiveLayers: []
};

function statsReducer(state = initialState, action) {

  switch (action.type) {
    case Constants.SET_MORE_STATS_OPTION:

      return Object.assign({}, state, {
        moreStats: action.moreStats,
      });
    
    default:
      return state;
  }
}

export { statsReducer, initialState };

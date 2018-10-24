import * as Constants from '../constants'
import data from '../data.json'
import Map from '../components/map'

const options = [{
  name: 'Trash by size',
  description: 'Size of trash pile',
  property: 'pop_est',
  stops: [
    ["Bagful", '#f8d5cc'],
    ["Handful", '#f4bfb6'],
    ["Cartload", '#f1a8a5'],
    ["Trackload", '#ee8f9a']
  ]
}, {
  name: 'Waste site type',
  description: 'Type of the trash pile',
  property: 'gdp_md_est',
  stops: [
    ["Wind", '#f8d5cc'],
    ["Dump", '#f4bfb6'],
    ["Washed into Drain", '#f1a8a5'],
    ["Liquid Waste", '#ee8f9a']
  ]
}]

const initialState: State = {
  data,
  options,
  active: options[0],
  features_: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });

    case Constants.SET_FEATURES:
      return Object.assign({}, state, {
        features_: action.features_
      });

    default:
      return state;
  }
}

export { reducer, initialState };

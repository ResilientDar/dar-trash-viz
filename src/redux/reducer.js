import * as Constants from '../constants'
import data from '../data.json'

const options = [{
  name: 'Trash by size',
  description: 'Size of trash pile',
  property: 'pop_est',
  stops: [
    [0, '#f8d5cc'],
    [100, '#f4bfb6'],
    [500, '#f1a8a5'],
    [100, '#ee8f9a'],
    [500, '#ec739b']
  ]
}, {
  name: 'Trash by type',
  description: 'Type of the trash pile',
  property: 'gdp_md_est',
  stops: [
    [0, '#f8d5cc'],
    [1000, '#f4bfb6'],
    [5000, '#f1a8a5'],
    [10000, '#ee8f9a']
  ]
}]

const initialState: State = {
  data,
  options,
  active: options[0]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });
    default:
      return state;
  }
}

export { reducer, initialState };

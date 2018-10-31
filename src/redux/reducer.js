import * as Constants from '../constants'
import data from '../dar-trash.geojson'

const options = [{
  name: 'Trash by size',
  description: 'Size of trash pile',
  property: 'trash_size',
  stops: [
    ["Bagful", '#f8d5cc'],
    ["Handful", '#f4bfb6'],
    ["Cartload", '#f1a8a5'],
    ["Truckload", '#ee8f9a'],
    ["Other", '#18a6b9'],
    ["Unidentified", '#008000']
    
  ]
}, {
  name: 'Waste site type',
  description: 'Type of the trash pile',
  property: 'waste_site',
  stops: [
    ["Blown_by_Wind", '#f8d5cc'],
    ["Dump", '#f4bfb6'],
    ["Washed_into_Drain", '#f1a8a5'],
    ["Liquid_Waste", '#ee8f9a'],
    ["Other", '#18a6b9'],
    ["Unidentified", '#008000']
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

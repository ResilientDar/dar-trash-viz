import * as Constants from '../constants'

const options = [{
  name: 'Trash by size',
  description: 'Size of trash pile',
  property: 'ts',
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
  property: 'ws',
  stops: [
    ["Blown_by_Wind", '#f8d5cc'],
    ["Dump", '#f4bfb6'],
    ["Washed_into_Drain", '#f1a8a5'],
    ["Liquid_Waste", '#ee8f9a'],
    ["Other", '#18a6b9'],
    ["Unidentified", '#008000']
  ]
},
{
  name: 'Near bus station',
  description: 'Trash near bus stations',
  property: 'nbs',
  stops: [
    ["Yes", '#ee8f9a'],
    ["No", '#f4bfb6'],
    ["Unidentified", '#18a6b9']
  ]
},
{
  name: 'Clean up method',
  description: 'Trash clean up method',
  property: 'clm',
  stops: [
    ["By_Hand", '#ee8f9a'],
    ["By_Machine_Only", '#f1a8a5'],
    ["impossible", '#f4bfb6'],
    ["Unidentified", '#18a6b9']
  ]
},
{
  name: 'Accessibility',
  description: 'Can be access by',
  property: 'at',
  stops: [
    ["Cart", '#ee8f9a'],
    ["Truck", '#f1a8a5'],
    ["Foot only", '#f4bfb6'],
    ["Unidentified", '#18a6b9']
  ]
}]

const initialState: State = {
  options,
  active: options[0],
  currentFeature: null,
  selectedStops: assignSelectedStops(options[0].stops)
};

function assignSelectedStops(stops){
  var selectedStops = [];
  for (var i = 0; i < stops.length; i++) {
      selectedStops[i] = stops[i][0];
  }
  return selectedStops;
}

function contains(selectedStops, stop){
  return selectedStops.includes(stop);
}

function addStop(selectedStops, stop){
  // make a separate array copy
  var slicedStops = selectedStops.slice();
  slicedStops.push(stop);

  return slicedStops;
}

function removeStop(selectedStops, stop){
  // make a separate array copy
  var slicedStops = selectedStops.slice();

  var index = selectedStops.indexOf(stop);
  slicedStops.splice(index, 1);

  return slicedStops;
}

function reducer(state = initialState, action) {

  console.log("reducer called from ");

  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:

      return Object.assign({}, state, {
        active: action.option,
        selectedStops: assignSelectedStops(action.option.stops)
      });
    case Constants.SET_FEATURES:
      console.log("set features ");

      return Object.assign({}, state, {
        currentFeature: action.currentFeature
      });
    case Constants.SET_LEGEND_ACTIVE_OPTION:
      if(contains(state.selectedStops, action.option)){
        var stops = removeStop(state.selectedStops, action.option);
        return Object.assign({}, state, {
          selectedStops: stops
        });
      }
      else{
        var stops = addStop(state.selectedStops, action.option);

          return Object.assign({}, state, {
            selectedStops: stops
          });
      }
    default:
      return state;
  }
}

export { reducer, initialState };

import {map} from '../redux/reducers/map'
import * as Constants from '../constants'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('map reducer', () => {

	const option = {
					  name: 'Trash by size',
					  description: 'Size of trash pile',
					  property: 'ts',
					  stops: [
					     ["Cartload", '#f4bfb6'],
               ["Truckload", '#ee8f9a']
					    
					  ]
					}

  	const expectedSelectedStops = [
							  		"Cartload",
							  		"Truckload"
							  		];

	it('should return initial state', () => {
  	  const expectedInitialState = {"active": {"description": "Size of trash pile", "name": "Trash by size", "property": "ts", "stops": [["Cartload", "#f4bfb6"], ["Truckload", "#ee8f9a"]]}, "analysisActive": false, "analysisOptions": [{"description": "Trash pile count in Wards", "name": "Wards", "new": false, "property": "trash_pile", "stops": [[0, "#18a6b9"], [40, "#f4bfb6"], [100, "#f1a8a5"], [300, "#ee8f9a"], [700, "#ef4040"], [1100, "#ff0000"]]}, {"description": "Trash pile count in Subwards", "name": "Subwards", "new": true, "property": "trash_sub", "stops": [[0, "#18a6b9"], [40, "#f4bfb6"], [100, "#f1a8a5"], [300, "#ee8f9a"], [700, "#ef4040"], [1100, "#ff0000"]]}, {"description": "Trash pile count in Shinas", "name": "Shinas", "new": true, "property": "trash_sh", "stops": [[0, "#18a6b9"], [5, "#f4bfb6"], [10, "#f1a8a5"], [20, "#ee8f9a"], [50, "#ef4040"], [100, "#ff0000"]]}, {"description": "Trash piles within 1 meter from drains", "name": "Trash near Drains", "new": false, "property": "dist_cm", "stops": [[0, "#ff0000"], [30, "#f1a8a5"], [100, "#f8d5cc"]]}], "currentFeature": null, "infoActive": false, "moreAnalysis": false, "options": [{"description": "Size of trash pile", "name": "Trash by size", "property": "ts", "stops": [["Cartload", "#f4bfb6"], ["Truckload", "#ee8f9a"]]}, {"description": "Type of the trash pile", "name": "Waste site type", "property": "ws", "stops": [["Blown_by_Wind", "#f8d5cc"], ["Dump", "#f4bfb6"], ["Washed_into_Drain", "#f1a8a5"], ["Liquid_Waste", "#ee8f9a"], ["Other", "#18a6b9"], ["Unidentified", "#008000"]]}, {"description": "Trash near bus stations", "name": "Near bus station", "property": "nbs", "stops": [["Yes", "#ee8f9a"], ["No", "#f4bfb6"], ["Unidentified", "#18a6b9"]]}, {"description": "Trash clean up method", "name": "Clean up method", "property": "clm", "stops": [["By_Hand", "#ee8f9a"], ["By_Machine_Only", "#f1a8a5"], ["impossible", "#f4bfb6"], ["Unidentified", "#18a6b9"]]}, {"description": "Can be access by", "name": "Accessibility", "property": "at", "stops": [["Cart", "#ee8f9a"], ["Truck", "#f1a8a5"], ["Foot only", "#f4bfb6"], ["Unidentified", "#18a6b9"]]}], "selectedStops": ["Cartload", "Truckload"], "showModalImg": false, "showNotification": false, "zoomToFeature": false};

	    expect(map(undefined, {})).toEqual(expectedInitialState)
  	})

  	it('should handle SET_ACTIVE_OPTION action', () => {

  		const action = {
  			type: Constants.SET_ACTIVE_OPTION,
  			option: option
  		}

  		const expectedActiveOption = option;
		const output = map(undefined, action);
					  		
  		expect(output.active).toEqual(
  			expectedActiveOption);
  		expect(output.selectedStops).toEqual(
  			expectedSelectedStops);
  		expect(output.analysisActive).toEqual(
  			false);
  	})

  	it('should handle SET_ANALYSIS_ACTIVE_OPTION action', () => {
  		const action = {
  			type: Constants.SET_ANALYSIS_ACTIVE_OPTION,
  			option: option
  		}

  		const expectedActiveOption = option;
		const output = map(undefined, action);
					  		
  		expect(output.active).toEqual(
  			expectedActiveOption);
  		expect(output.selectedStops).toEqual(
  			expectedSelectedStops);
  		expect(output.analysisActive).toEqual(
  			true);
  	})

  	it('should handle SET_LEGEND_ACTIVE_OPTION action', () => {

  		const action = {
  			type: Constants.SET_LEGEND_ACTIVE_OPTION,
  			option: "Cartload"
  		}

  		const editedSelectedStops = [
							  		"Truckload"
							  		];

  		const expectedActiveOption = option;
		  const output = map(undefined, action);
					  		
  		expect(output.active).toEqual(
  			expectedActiveOption);
  		expect(output.selectedStops).toEqual(
  			editedSelectedStops);
  	})

  	it('should handle SET_INFO_ACTIVE action', () => {
  		const infoActive =  false;
      const showModalImg = false;
      const zoomToFeature = false;

  		const action = {
  			type: Constants.SET_INFO_ACTIVE,
  			infoActive,
			  showModalImg,
			  zoomToFeature
  		}

		const output = map(undefined, action);
					  		
  		expect(output.infoActive).toEqual(
  			infoActive);
  		expect(output.showModalImg).toEqual(
  			showModalImg);
  		expect(output.zoomToFeature).toEqual(
  			zoomToFeature);
  	})

  	it('should handle SET_FEATURES action', () => {
  		const currentFeature =  {};
  		const infoActive = true;

  		const action = {
  			type: Constants.SET_FEATURES,
  			currentFeature,
  			infoActive
  		}

		const output = map(undefined, action);
					  		
  		expect(output.currentFeature).toEqual(
  			currentFeature);
  		expect(output.infoActive).toEqual(
  			infoActive);
  	})

})
import { statsReducer } from '../../redux/reducers/stats-reducer'
import * as Constants from '../../constants'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('Stats reducer', () => {

  const expectedInitialState = {
        showNotification: true,
        moreStats: false,
        features: [],
        layers: [],
        activeLayers: [],
        analysisActiveLayers: [],
        clusterActive: false
      };

	it('should return initial state', () => {

	    expect(statsReducer(undefined, {})).toEqual(expectedInitialState)
  })

	it('should handle SET_MORE_STATS_OPTION action', () => {

		const action = {
			type: Constants.SET_MORE_STATS_OPTION,
			moreStats: true
		}

		let expectedOutput = Object.assign({}, expectedOutput, expectedInitialState);

    expectedOutput.moreStats = true;

	  const output = statsReducer(undefined, action);
				  		
		expect(output).toEqual(
			expectedOutput);
	})

  it('should handle SET_CLUSTER_ACTIVE action', () => {

    const action = {
      type: Constants.SET_CLUSTER_ACTIVE,
      clusterActive: true
    }

    let expectedOutput = Object.assign({}, expectedOutput, expectedInitialState);
    expectedOutput.clusterActive = true;

    const output = statsReducer(undefined, action);
              
    expect(output).toEqual(
      expectedOutput);
  })

  it('should handle SET_FEATURES action', () => {

    const action = {
      type: Constants.SET_FEATURES,
      features: [{"test": true}] 
    }

    let expectedOutput = Object.assign({}, expectedOutput, expectedInitialState);
    expectedOutput.features = [{"test": true}] ;

    const output = statsReducer(undefined, action);
              
    expect(output).toEqual(
      expectedOutput);
  })

})
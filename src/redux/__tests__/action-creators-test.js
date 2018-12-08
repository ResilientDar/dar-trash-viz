import * as actions from '../action-creators'
import * as Constants from '../../constants'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('actions', () => {

  const initialState = {}
  const store = mockStore(initialState)

  afterEach(() => {
   store.clearActions();
  });

  // const setActiveOption = () => ({ type: Constants.SET_ACTIVE_OPTION });
  // const setAnalysisActiveOption = () => (
  //   { type: Constants.SET_ANALYSIS_ACTIVE_OPTION });
  // const setLegendActiveOption = () => (
  //   { type: Constants.SET_LEGEND_ACTIVE_OPTION });
  // const setInfoActive = () => (
  //   { type: Constants.SET_INFO_ACTIVE });

  const option = {
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
          }

  it('should dispatch an action to set active option', () => {

    const expectedAction = {
        type: Constants.SET_ACTIVE_OPTION,
        option: option
    }

    store.dispatch(actions.setActiveOptionAction(option));
    
    expect(store.getActions()).toEqual([expectedAction])
   
  })

  it('should dispatch an action to set analysis active option', () => {

    store.dispatch(actions.setAnalysisActiveOptionAction());

    const expectedAction = {
      type: Constants.SET_ANALYSIS_ACTIVE_OPTION
    }
    
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('should dispatch an action to set legend active option', () => {

    store.dispatch(actions.setLegendActiveOptionAction());

    const expectedAction = {
      type: Constants.SET_LEGEND_ACTIVE_OPTION
    }
    
    expect(store.getActions()).toEqual([expectedAction])
  })

  it('should dispatch an action to set info active option', () => {

    store.dispatch(actions.setInfoActiveAction());

    const expectedAction = {
      type: Constants.SET_INFO_ACTIVE
    }
    
    expect(store.getActions()).toEqual([expectedAction])
  })
})
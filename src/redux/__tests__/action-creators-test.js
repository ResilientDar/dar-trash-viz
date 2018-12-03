import * as actions from '../action-creators'
import * as Constants from '../../constants'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)

describe('actions', () => {

    const setActiveOption = () => ({ type: Constants.SET_ACTIVE_OPTION });
    const setAnalysisActiveOption = () => (
      { type: Constants.SET_ANALYSIS_ACTIVE_OPTION });
    const setLegendActiveOption = () => (
      { type: Constants.SET_LEGEND_ACTIVE_OPTION });
    const setInfoActive = () => (
      { type: Constants.SET_INFO_ACTIVE });

  it('should dispatch an action to set active option', () => {

    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(setActiveOption());

    const actions = store.getActions();

    const expectedAction = {
      type: Constants.SET_ACTIVE_OPTION
    }

    expect(actions).toEqual([expectedAction])
  })

  it('should dispatch an action to set analysis active option', () => {

    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(setAnalysisActiveOption());

    const actions = store.getActions();

    const expectedAction = {
      type: Constants.SET_ANALYSIS_ACTIVE_OPTION
    }
    
    expect(actions).toEqual([expectedAction])
  })

  it('should dispatch an action to set legend active option', () => {

    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(setLegendActiveOption());

    const actions = store.getActions();

    const expectedAction = {
      type: Constants.SET_LEGEND_ACTIVE_OPTION
    }
    
    expect(actions).toEqual([expectedAction])
  })

  it('should dispatch an action to set info active option', () => {

    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(setInfoActive());

    const actions = store.getActions();

    const expectedAction = {
      type: Constants.SET_INFO_ACTIVE
    }
    
    expect(actions).toEqual([expectedAction])
  })
})
import * as actions from '../redux/features'
import * as Constants from '../constants'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)

describe('Features', () => {
  const initialState = {}
  const store = mockStore(initialState)

  it('should dispatch an action to set features', () => {

    store.clearActions();

    const currentFeature = {};
    const infoActive = true;

    store.dispatch(actions.setCurrentFeatureAction(
      currentFeature,
      infoActive));


    const expectedAction = {
      type: Constants.SET_CURRENT_FEATURE,
      currentFeature,
      infoActive
    }

    expect(store.getActions()).toEqual([expectedAction])
  })

})
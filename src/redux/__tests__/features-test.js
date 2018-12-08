import * as actions from '../features'
import * as Constants from '../../constants'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)

describe('features', () => {
  const initialState = {}
  const store = mockStore(initialState)

  const setFeatures = () => ({ type: Constants.SET_FEATURES });

  it('should dispatch an action to set features', () => {

    store.clearActions();
    store.dispatch(setFeatures());

    const actions = store.getActions();

    const expectedAction = {
      type: Constants.SET_FEATURES
    }

    expect(actions).toEqual([expectedAction])
  })

})
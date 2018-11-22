import * as actions from '../action-creators'
import * as Constants from '../../constants'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)

describe('actions', () => {
  it('should create an action to set active option', () => {

  	const initialState = {}
  	const store = mockStore(initialState)
  	
    const option = 'option'

    const expectedAction = {
      type: Constants.SET_ACTIVE_OPTION,
      option
    }
    expect(actions.setActiveOption(option)).toEqual(expectedAction)
  })
})
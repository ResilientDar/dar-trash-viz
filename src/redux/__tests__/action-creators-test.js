import * as actions from '../action-creators'
import * as Constants from '../../constants'

describe('actions', () => {
  it('should create an action to set active option', () => {
    const option = 'option'

    const expectedAction = {
      type: Constants.SET_ACTIVE_OPTION,
      option
    }
    expect(actions.setActiveOption(option)).toEqual(expectedAction)
  })
})
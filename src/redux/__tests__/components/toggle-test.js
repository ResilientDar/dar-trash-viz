import React from 'react'
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import ConnectedToggle, { Toggle } from '../../../components/toggle'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

configure({ adapter: new Adapter() })

function setup() {
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
        }]

  const active = options[0];
  const props = {
    options,
    active,
    onChange: jest.fn(),
    store
  }
  const enzymeWrapper = shallow(
    <Toggle {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Toggle', () => {
  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.dive().find('div').hasClass('listing-group')).toBe(true)
  })

})
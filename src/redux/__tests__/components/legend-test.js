import React from 'react'
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import { Legend } from '../../../components/legend'
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

  const active = options[0]

  const selectedStops = [
            "Bagful",
            "Handful",
            "Cartload",
            "Truckload",
            "Other",
            "Unidentified"
          ]

  const props = {
    active,
    selectedStops,
    onChange: jest.fn(),
    store
  }
  const enzymeWrapper = shallow(
    <Legend {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Legend', () => {
  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.dive().find('div').first().hasClass('bg-white')).toBe(true);
    expect(enzymeWrapper.dive().find('div').at(1).hasClass('mb6')).toBe(true);
    expect(enzymeWrapper.dive().find('nav').hasClass('filter-group')).toBe(true);

  })

})
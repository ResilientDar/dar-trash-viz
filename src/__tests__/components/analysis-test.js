import React from 'react'
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import  { Analysis }  from '../../components/analysis'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = { main:{} }
const store = mockStore(initialState)

configure({ adapter: new Adapter() })

const analysisOptions = [{
  name: 'Wards',
  description: 'Trash pile count in Wards',
  property: 'trash_pile',
  stops: [
    [0, '#18a6b9'],
    [40, '#f4bfb6'],
    [100, '#f1a8a5'],
    [300, '#ee8f9a'],
    [700, '#ef4040'],
    [1100,'#ff0000'] 
  ]
}]

function setup() {
  const props = {
    analysisOptions: analysisOptions,
    active: analysisOptions[0],
    onChange: jest.fn(),
    store: store
  }
  const enzymeWrapper = shallow(<Analysis {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('Analysis', () => {

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.dive().find('div').hasClass('listing-group')).toBe(true)
  })

})
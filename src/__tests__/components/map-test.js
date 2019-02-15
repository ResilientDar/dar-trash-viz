import React from 'react'
import { configure } from 'enzyme'
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import  { Map } from '../../components/map'
import configureStore from 'redux-mock-store'


// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//    Map: () => require("mapbox-gl-js-mock")
// }));

jest.mock("mapbox-gl", () => {
  return jest.fn().mockImplementation(() => require("mapbox-gl-js-mock"))
});

const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = { main:{} }
const store = mockStore(initialState)

configure({ adapter: new Adapter() })

function setup() {
  const props = {
    store: store
  }
  const enzymeWrapper = shallow(<Map {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('Map', () => {

  it('should render self and subcomponents', () => {
    // const { props, enzymeWrapper } = setup();

    // expect(enzymeWrapper.dive().find('div').hasClass('absolute')).toBe(true)
  })

})
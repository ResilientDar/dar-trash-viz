import React from 'react'
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import  { Nav }  from '../../components/nav'
import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = { main:{} }
const store = mockStore(initialState)

configure({ adapter: new Adapter() })

function setup() {
  const props = {
    store: store
  }
  const enzymeWrapper = shallow(<Nav {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('Nav', () => {

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.find('nav').hasClass('menu')).toBe(true)
  })

})
import React from 'react'
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import  { Info }  from '../../components/info'

import configureStore from 'redux-mock-store'


const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = { main:{} }
const store = mockStore(initialState)

configure({ adapter: new Adapter() })

function setup() {
  const props = {
    infoActive: true,
    store: store
  }
  const enzymeWrapper = shallow(<Info {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('Info', () => {

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    //TODO pass infoActive as prop into Info 
    expect(enzymeWrapper.dive().get(0)).toBe(null)
  })

})
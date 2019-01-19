import React from 'react'
import { configure } from 'enzyme'
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import Tooltip from '../../components/tooltip'

configure({ adapter: new Adapter() })

const features = [{}]

function setup() {
  const props = {
    features: features
  }
  const enzymeWrapper = shallow(<Tooltip {...props} />)

   return {
    props,
    enzymeWrapper
  }
}

describe('Tooltip', () => {

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').first().hasClass('flex-parent-inline')).toBe(true)
    expect(enzymeWrapper.find('div').at(1).hasClass('flex-child')).toBe(true)
    expect(enzymeWrapper.find('span').hasClass('flex-child')).toBe(true)
  })

})
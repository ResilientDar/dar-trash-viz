import React from 'react'
import PropTypes from 'prop-types'

export default class Tooltip extends React.Component {

  static propTypes = {
    features: PropTypes.array.isRequired
  };

  render() {
    const { features } = this.props;

    const renderFeature = (feature, i) => {
      return (
        <div key={i}>
          <strong className='mr3 center'>WARD DETAILS</strong> <br></br>
          <span className='color-gray-light'>Ward name :
           {feature && feature.properties && feature.properties.ward_name}
           </span> <br></br>
          <span className='color-gray-light'>District name:
           {feature && feature.properties && feature.properties.district_n}
           </span> <br></br>
          <span className='color-gray-light'>Total waste piles count: 
          {feature &&  feature.properties && feature.properties.trash_pile}
          </span>
        </div>
      )
    };

    return (
      <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
        <div className="flex-child px12 py12 bg-gray-dark color-white shadow-darken10 round txt-s w240 clip txt-truncate">
          {/*Check if features are defined then map them*/}
          {features && features.map(renderFeature)}
        </div>
        <span className="flex-child color-gray-dark triangle triangle--d"></span>
      </div>
    );
  }
}
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Popup = class Popup extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired
  };

  render() {
    const { image_path} = this.props.active;

    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: stop[1] }} />
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

    return (
      <div>
        <a href={image_path} data-toggle='modal' className='img1' id='meta3'>
        <img src={image_path} className='image_path'/>
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active
  };
}

Popup = connect(mapStateToProps)(Popup);

export default Popup;

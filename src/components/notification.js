import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Notification extends React.Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    showNotification: PropTypes.bool
  };

  render() {
    const { options, active } = this.props;

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      
      <div>
        <div className="absolute top left ml180 mt12">
          <span> </span>
        </div>
        { this.props.showNotification &&
        <div className="listing-group absolute top left ml180 mt12 border--white bg-white shadow-darken10 z1">
          {/*Check if options are defined then map them */}
          {options && options.map(renderOptions)}
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    active: state.active,
    showNotification: state.showNotification
  };
}

Notification = connect(mapStateToProps)(Notification);

export default Notification;

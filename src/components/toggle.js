import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'

export class Toggle extends React.Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
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
      <Draggable>
      <div className="listing-group absolute top left ml12 mt92 border border--2 border--white bg-white shadow-darken10 z1">
        {/*Check if options are defined then map them */}
        {options && options.map(renderOptions)}
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    active: state.active
  };
}

Toggle = connect(mapStateToProps)(Toggle);

export default Toggle;

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
        <div key={i}>
        <div className={option.new ? "": "hide"}>
            <button className="btn--s fr glow txt-bold">new </button>
          </div>
        <label  className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
          
        </label>
        </div>
      );
    }

    return (
      <Draggable>
      <div className="listing-group absolute top left w180 ml12 mt92 border border--2 border--white bg-white shadow-darken10 z1">
        {/*Check if options are defined then map them */}
        {options && options.map(renderOptions)}
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  let mainState = state["main"]
  return {
    options: mainState.options,
    active: mainState.active
  };
}

Toggle = connect(mapStateToProps)(Toggle);

export default Toggle;

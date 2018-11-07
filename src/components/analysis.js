import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Analysis = class Analysis extends React.Component {

  static propTypes = {
    analysis_options: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { analysis_options, active } = this.props;

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div className="listing-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1 analysis">
        Analysis
        {analysis_options.map(renderOptions)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    analysis_options: state.analysis_options,
    active: state.active
  };
}

Analysis = connect(mapStateToProps)(Analysis);

export default Analysis;

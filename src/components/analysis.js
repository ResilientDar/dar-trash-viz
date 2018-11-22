import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Analysis = class Analysis extends React.Component {

  static propTypes = {
    analysisOptions: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    analysisActive: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { analysisOptions, active } = this.props;

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div className="listing-group absolute left ml12 mt180 border border--2 border--white bg-white shadow-darken10 z1 analysis">
        Analysis
        {analysisOptions.map(renderOptions)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    analysisOptions: state.analysisOptions,
    active: state.active,
    analysisActive: state.analysisActive
  };
}

Analysis = connect(mapStateToProps)(Analysis);

export default Analysis;

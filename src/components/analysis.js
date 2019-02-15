import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'

export class Analysis extends React.Component {

  static propTypes = {
    analysisOptions: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    analysisActive: PropTypes.bool,
    moreAnalysis: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { analysisOptions, active } = this.props;

    const renderOptions = (option, i) => {

      if(i < 4){
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
      }else{
       return (
        <div key={i}>
        <div className={this.props.moreAnalysis? "": "hide"} id="analysis-more">
        <div className={option.new ? "": "hide"}><button className=' btn--s fr glow txt-bold'>new </button></div>
        <label className="toggle-container">
          <input onChange={() => this.props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
          
        </label>
        </div>

        </div>
      ); 
      }
    }

    return (
      <Draggable>
      <div className="listing-group absolute left ml12 mt276 w180 border border--2 border--white bg-white shadow-darken10 z1 analysis">
        Analysis
        {/*Check if analysis options are defined then map them */}
        {analysisOptions && analysisOptions.map(renderOptions)}
        <span className="more-list fr" onClick={() => this.props.onClick(!this.props.moreAnalysis)} >
        {this.props.moreAnalysis? "less": "more"}</span>
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  let mainState = state["main"]
  return {
    analysisOptions: mainState.analysisOptions,
    active: mainState.active,
    analysisActive: mainState.analysisActive,
    moreAnalysis: mainState.moreAnalysis
  };
}

Analysis = connect(mapStateToProps)(Analysis);

export default Analysis;

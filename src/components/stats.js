import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createFilter } from '../util/filters';

export class Stats extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired,
    activeLayers: PropTypes.array,
    showNotification: PropTypes.bool,
    features: PropTypes.array,
    moreStats: PropTypes.bool,
    selectedStops: PropTypes.array
  };

  render() {
    const { name, description, property, stops } = this.props.active || {};    

    const renderPointStats = (stop, i) => {
      if(this.props.selectedStops.includes(stop[0])){
        var len = 0
        if (Array.isArray(stop) && stop.length) {
            var stopFilter = [property, stop[0]]

            var data = this.props.features.filter(createFilter(...stopFilter));
            len = data.length
        }
        return (
          
          <div key={i} className="txt-s" >
                
                <span className="txt-h4" style={{ color: stop[1] }}> {len} </span>

                <label htmlFor={`${stop[0].toLocaleString()}`} >
                {`${stop[0].toLocaleString()}`}
                </label>
          </div>
        );
      }
      
    }

    return (
        <div className="absolute top left mt12 ml240">

          {this.props.moreStats && this.props.features &&
          <div className="bg-white py12 px12 shadow-darken10 round wmax180">
            {/*Check if features are defined then map them*/}
            <div className='mb6'>
              <h2 className="txt-bold txt-s block">COUNT </h2>
            </div>
            <nav id="filter-group" className="filter-group">
            {stops && stops.map(renderPointStats)}
            </nav>

          </div>
           }
        </div>
     
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active,
    activeLayers: state.activeLayers,
    showNotification: state.showNotification,
    features: state.features,
    moreStats: state.moreStats,
    selectedStops: state.selectedStops
  };
}

Stats = connect(mapStateToProps)(Stats);

export default Stats;
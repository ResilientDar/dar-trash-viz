import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createFilter } from '../util/filters';
import Draggable from 'react-draggable'

export class Stats extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired,
    activeLayers: PropTypes.array,
    showNotification: PropTypes.bool,
    features: PropTypes.array,
    moreStats: PropTypes.bool,
    selectedStops: PropTypes.array,
    clusterActive: PropTypes.bool,
    analysisActive: PropTypes.bool,
    analysisActiveOption: PropTypes.object,
    analysisOptions: PropTypes.array
  };

  hasOptionProperty(property) {
    if(this.props.analysisActiveOption === null) return false

    return this.props.analysisActiveOption.property === property
  }

  showStats(property){
    return this.hasOptionProperty('ga') || !this.props.analysisActive
  }

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
        <Draggable>
        <div className="absolute top left mt12 ml240 ">

          {this.props.moreStats && this.props.features && this.showStats()  &&
          <div className="bg-white py12 px12 shadow-darken10 round wmax180">
            {/*Check if features are defined then map them*/}
            <div className='mb6'>
              <h2 className="txt-bold txt-s block txt-underline">Features Count </h2>
            </div>
            <nav id="filter-group" className="filter-group">
            {stops && stops.map(renderPointStats)}
            </nav>
            {this.props.clusterActive && 
              <div>
               <div className='mt12 mb6'>
                <h2 className="txt-bold txt-s block txt-underline">Cluster Categories </h2>
              </div>
              <nav id="filter-group" className="filter-group">
                <div className="txt-s" >
                    <span className="mr6 round-full w12 h12 inline-block align-middle txt-h4" style={{ backgroundColor: "#51bbd6" }} /> 
                    <label htmlFor="1 - 99" >
                      1 - 99
                    </label>
                </div>
                 <div className="txt-s" >
                     <span className="mr6 round-full w12 h12 inline-block align-middle txt-h4" style={{ backgroundColor: "#f1f075" }} /> 
                    <label htmlFor="100 - 750" >
                      101 - 749
                    </label>
                  </div>
                  <div className="txt-s" >
                    <span className="mr6 round-full w12 h12 inline-block align-middle txt-h4" style={{ backgroundColor: "#f28cb1" }} /> 
                    <label htmlFor="> 750" >
                      > 750
                    </label>
                  </div>
              </nav>
              </div>
            }
          </div>

          
           }

           
        </div>
        </Draggable>
     
    );
  }
}

function mapStateToProps(state) {
  let mainState = state["main"]
  let statsState = state["stats"]
  return {
    active: mainState.active,
    activeLayers: mainState.activeLayers,
    showNotification: statsState.showNotification,
    features: statsState.features,
    moreStats: statsState.moreStats,
    selectedStops: mainState.selectedStops,
    clusterActive: statsState.clusterActive,
    analysisActive: mainState.analysisActive,
    analysisOptions: mainState.analysisOptions,
    analysisActiveOption: mainState.analysisActiveOption

  };
}

Stats = connect(mapStateToProps)(Stats);

export default Stats;
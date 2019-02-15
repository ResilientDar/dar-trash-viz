import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFeatures } from '../redux/features'
import data from '../data.json'
import Draggable from 'react-draggable'

export class Notification extends React.Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    showNotification: PropTypes.bool,
    features: PropTypes.array,
    moreStats: PropTypes.bool,
    analysisActive: PropTypes.bool
  };

  componentDidMount(){
    this.getStats();
  }

  numberSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getStats(){
    setFeatures(data.features)
  }

  render() {
    const { options, active } = this.props;
    
    return (
      <Draggable>
      <div>
        <div className="absolute top left mt12">
        </div>
        { this.props.showNotification &&
        <div className="listing-group notification absolute top left ml12 mt12 border--white bg-white shadow-darken10 z1">

          {/*Check if options are defined then map them */}
          { /* options && options.map(renderOptions) */}
          <div>
            <div className="fr">
              <span className="txt-bold prose txt-h3">
              {this.props.features && this.numberSeparator(this.props.features.length)}
              </span>
              <span className="txt-h4">   Waste Piles </span>

              {!this.props.moreStats && 
                <svg className='icon icon-notify icon-animate txt-h2' onClick = {() => this.props.onClick(true)} >
                <use xlinkHref='#icon-chevron-right'/>
                </svg>
              }

              {this.props.moreStats && 
                <svg className='icon icon-notify txt-h2' onClick = {() => this.props.onClick(false)} >
                <use xlinkHref='#icon-chevron-left'/></svg>
              }
             </div>
          </div>
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
    options: mainState.options,
    active: mainState.active,
    showNotification: statsState.showNotification,
    features: statsState.features,
    moreStats: statsState.moreStats,
    analysisActive: mainState.analysisActive
  };
}

Notification = connect(mapStateToProps)(Notification);

export default Notification;

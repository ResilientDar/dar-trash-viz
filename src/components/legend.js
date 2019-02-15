import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'

export class Legend extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired,
    selectedStops: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { name, description, stops } = this.props.active || {};

    const renderLegendKeys = (stop, i) => {
      return (
           <div key={i} className="txt-s" >
            <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: stop[1] }} />

            <input name="activeLegend" onChange={() => this.props.onChange(stop[0])}
            checked={this.props.selectedStops.includes(stop[0])} id={stop[0]} type="checkbox" />
            <label htmlFor={`${stop[0].toLocaleString()}`} >
            {`${stop[0].toLocaleString()}`}
            </label>
             </div>
           
      );
    }

    return (
      <Draggable>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round wmax180"
      title="Click the list items to filter the map">
        <div className='mb6'>
          <h2 className="txt-bold txt-s block">{name}</h2>
          <p className='txt-s color-gray'>{description}</p>
        </div>
         <nav id="filter-group" className="filter-group">
       {/*Check if stops are defined then map them*/}
        {stops && stops.map(renderLegendKeys)}
        </nav>
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  let mainState = state["main"]
  return {
    active: mainState.active,
    selectedStops: mainState.selectedStops
  };
}

Legend = connect(mapStateToProps)(Legend);

export default Legend;

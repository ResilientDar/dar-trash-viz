import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Legend = class Legend extends React.Component {

  constructor () {
    super();
    this.state = {
      activeLegend: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    active: PropTypes.object.isRequired,
    activeLegend: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };


  handleChange (evt) {
    // check it out: we get the evt.target.name
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ activeLegend: evt.target.id });
    this.props.onChange(this.state.activeLegend);
    console.log(this.state.activeLegend);
    console.log(this.props.activeLegend);
  }

  render() {
    const { name, description, stops } = this.props.active;

    const renderLegendKeys = (stop, i) => {
      return (
           <div key={i} >
            <input name="activeLegend" onChange={this.handleChange} 
            checked={stop[0] !== this.props.activeLegend} id={stop[0]} type="checkbox" />
            
            <label htmlFor={`${stop[0].toLocaleString()}`}>
            {`${stop[0].toLocaleString()}`}
            </label>
             </div>
           
      );
    }

    return (
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
        <div className='mb6'>
          <h2 className="txt-bold txt-s block">{name}</h2>
          <p className='txt-s color-gray'>{description}</p>
        </div>
         <nav id="filter-group" className="filter-group">
        {stops.map(renderLegendKeys)}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active,
    activeLegend: state.activeLegend
  };
}

Legend = connect(mapStateToProps)(Legend);

export default Legend;

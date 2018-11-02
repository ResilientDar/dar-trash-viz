import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './sibar.css'

let Sidebar = class Sidebar extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired
  };

  render() {
    // console.log('features',this.props.features[0]);

    const { name, description, stops } = this.props.active;

    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: stop[1] }} />
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

    return (
      <div className="bg-white absolute left sidebar_ mr12 mb24 py12 px12 shadow-darken10 round z1">
        <div className='mb6'>
          <h1 className="txt-bold txt-s block">DarTrash2018</h1>
          <p className="txt-s color-gray">laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div>
          <button type="button" className="btn btn-success btn-block">Waste site type</button>
          <button type="button" className="btn btn-success btn-block">Waste type </button>
          <button type="button" className="btn btn-success btn-block">Trash size </button>
          <button type="button" className="btn btn-success btn-block">Clean up method </button>
          <button type="button" className="btn btn-success btn-block">Accessibility </button>
        </div>
        <br/>
        <div>
          <h2><strong>Filters:</strong></h2>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active,
    features_: state.features_,
  };
}

Sidebar = connect(mapStateToProps)(Sidebar);

export default Sidebar;

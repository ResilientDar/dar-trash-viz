import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Nav = class Nav extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired
  };

  render() {
    return (
      <nav id="menu" className="menu">
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active
  };
}

Nav = connect(mapStateToProps)(Nav);

export default Nav;

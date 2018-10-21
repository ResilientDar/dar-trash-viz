import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let Nav = class Nav extends React.Component {

  static propTypes = {
    active: PropTypes.object.isRequired
  };

  state = { pointsActive: true,
                clustersActive: true};

  clickEventHandler(event){

    var clickedLayer = event.target.id;

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');

      if(clickedLayer === "clusters"){
        map.setLayoutProperty("cluster-count", 'visibility', 'none');
      }
    } else {
       map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

      if(clickedLayer === "clusters"){
        map.setLayoutProperty("cluster-count", 'visibility', 'visible');
      }
    }

    if(clickedLayer === 'points'){

       this.setState(state => ({
          pointsActive: !state.pointsActive
        }));
      }else{
         this.setState(state => ({
           clustersActive: !state.clustersActive
          }));
      }
  }

  render() {
    return (
      <nav id="menu" className="menu">
      <a href="#" className={this.state.pointsActive ? 'active' : ''} 
      onClick = {this.clickEventHandler.bind(this)} id="points"> points </a>
      <a href="#" className={this.state.clustersActive ? 'active' : ''} 
      onClick = {this.clickEventHandler.bind(this)} id="clusters">clusters</a>
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

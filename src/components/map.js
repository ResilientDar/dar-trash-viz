import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

let Map = class Map extends React.Component {
  map;

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    // this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/worldbank-education/cjn4d0fleg0552spd8hfv1qfi',
      center: [39.182384, -6.783038],
      zoom: 12
    });

    //Important events

    this.map.on('load', () => {
       this.map.addLayer({
        id: 'dar-trash',
        type: 'fill',
        source: 'dar-trash'
        }, 'dartrash-label-lg');

      this.setFill();
    });

    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['dar-trash'] });

      if (features.length) {
        var clickedPoint = features[0];
        // Close all other popups and display popup for clicked point
        this.createPopUp(clickedPoint);
      }
    });

    
  }

  createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    console.log(currentFeature);

    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(currentFeature.geometry.coordinates)
      // .setHTML('<img src="'+ currentFeature.properties.image_path +'" class="image_path" />')
      .setHTML('<div><a href="#exampleModal" data-toggle="modal" class="img1" id="meta3">'+
        '<img src="'+ currentFeature.properties.image_path +'" class="image_path"/></a></div>')
      .addTo(this.map);
  }


  setFill() {
    const { property, stops } = this.props.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    });    
  }

  createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<div><a href="#exampleModal" data-toggle="modal" class="img1" id="meta3">'+
        '<img src="'+ currentFeature.properties.image_path +'" class="image_path"/></a></div>')
      .addTo(this.map);
  }


  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    active: state.active
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;

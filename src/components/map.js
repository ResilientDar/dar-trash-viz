import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
import data from '../dar-trash.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

let Map = class Map extends React.Component {
  map;

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };

  state = {
            pointsActive: false,
            clustersActive: true};

  componentDidUpdate() {
    // this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/worldbank-education/cjn4d0fleg0552spd8hfv1qfi',
      center: [39.182384, -6.783038],
      zoom: 11
    });

    this.map.on("render", () => {
      if (!this.state.isReady) {
        this.setState({ isReady: true })
      }
    })

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());

    //Main events

    this.map.on('load', () => {
      this.setFill();
      this.mouseEvents();

      this.clusters();
      this.addPoints();
      
    });

     // this.createLayerControl(this);

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

  mouseEvents(){
    this.map.on('mouseenter', 'dar-trash', (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
    });
    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'dar-trash', (e) => {
        this.map.getCanvas().style.cursor = '';
    });
  }

  addPoints(){
    this.map.addLayer({
        id: 'dar-trash',
        type: 'fill',
        source: 'dar-trash',
        layout: {
          visibility :  'none'
        }

        }, 'dartrash-label-lg');
    this.map.setLayoutProperty('dar-trash', 'visibility', 'none');
  }

  clusters(){

    this.map.addSource("trash", {
        type: "geojson",
        data: data,
        cluster: true, // Enable clustering
        clusterRadius: 50, // Radius of each cluster when clustering points
        clusterMaxZoom: 15 // Max zoom to cluster points on
    });

     this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "trash",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "trash",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    this.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "trash",
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

    // inspect a cluster on click
    this.map.on('click', 'clusters', (e) => {
        var features = this.map.queryRenderedFeatures(e.point,
         { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        this.map.getSource('trash').getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err)
                return;

            this.map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });    
  }

  createLayerControl(mapInstance){
    
  }

  getLayerTextContent(id){
    if (id === "points") return "dar-trash";
    else if (id === "clusters") return "clusters";
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

  clickEventHandler(event){

    var clickedLayer = event.target.id;

    console.log(this.map);
    console.log(clickedLayer);

    var visibility = this.map.getLayoutProperty(clickedLayer, 'visibility');
   

    if (visibility === 'visible') {
      this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');

      if(clickedLayer === "clusters"){
        this.map.setLayoutProperty("cluster-count", 'visibility', 'none');
      }
      this.map.setLayoutProperty("dar-trash", 'visibility', this.state.pointsActive ? 'visible' : 'none');
      this.map.setLayoutProperty("clusters", 'visibility', this.state.clustersActive ? 'visible' : 'none');
    }

    else {
       this.map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

      if(clickedLayer === "clusters"){
        this.map.setLayoutProperty("cluster-count", 'visibility', 'visible');
      }
    }

   this.setState(state => ({
      pointsActive: !state.pointsActive
    }));
   this.setState(state => ({
       clustersActive: !state.clustersActive
      }));
  }


  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
         <nav id="menu" className="menu">
         <a href="#" className={this.state.clustersActive ? 'active' : ''} 
      onClick = {this.clickEventHandler.bind(this)} id="clusters">clusters</a>
        <a href="#" className={this.state.pointsActive ? 'active' : ''} 
        onClick = {this.clickEventHandler.bind(this)} id="dar-trash"> points </a>
      </nav>
      </div>
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

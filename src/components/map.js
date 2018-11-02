import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
import data from '../data.json'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdHdlc2EiLCJhIjoiZTc1OTQ4ODE0ZmY2MzY0MGYwMDNjOWNlYTYxMjU4NDYifQ.F1zCcOYqpXWd4C9l9xqvEQ';

let Map = class Map extends React.Component {
  map;

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    activeLegend: PropTypes.string
  };

  state = {
            pointsActive: false,
            clustersActive: true};

  componentDidUpdate() {
     this.setColor();
     this.setFilter();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/samtwesa/cjnrbl5zc1u6b2smsvrep1rqq',
      center: [39.182384, -6.783038],
      zoom: 11
    });

    // Make sure all children load after map finishing rendering

    this.map.on("render", () => {
      if (!this.state.isReady) {
        this.setState({ isReady: true })
      }
    })

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());

    //Main events

    this.map.on('load', () => {
      this.mouseEvents();
      this.clusters();
      this.addPoints();
      // this.setFill();
    });

    this.createLayerControl(this);
    this.clickEventsOnPoints();
    
  }

  setColor() {
    const { property, stops } = this.props.active;
    console.log('stops');
    this.map.setPaintProperty('dar-trash', 'circle-color', {
      property,
      stops,
      type: "categorical"
    });    
  }

  setFilter() {
    const { property, stops } = this.props.active;
    const legend = this.props.activeLegend;
    console.log(legend);
    console.log(this.props.active.stops[0][0]);

    if(legend != null){
       this.map.setFilter('dar-trash', ['!=', property, legend]);
    }
   
  }

  clickEventsOnPoints(){
    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['dar-trash', 'unclustered-point'] });

      this.removePopUp();

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
    var id = this.getLayerPosition('symbol');

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'dar-trash',
        type: 'fill',
        source: 'dar-trash',
        layout: {
          visibility :  'none'
        }

        }, id);
    // this.map.setLayoutProperty('dar-trash', 'visibility', 'none');
  }

  clusters(){

    this.map.addSource("trash", {
        type: "geojson",
        data: data,
        cluster: true, // Enable clustering
        clusterRadius: 50, // Radius of each cluster when clustering points
        clusterMaxZoom: 23 // Max zoom to cluster points on
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

    // Hide clusters layers, from first time load
    this.map.setLayoutProperty('clusters', 'visibility', 'none');  
    this.map.setLayoutProperty("cluster-count", 'visibility', 'none');
    this.map.setLayoutProperty("unclustered-point", 'visibility', 'none');
  }

  createLayerControl(mapInstance){

    var toggleableLayerIds = [ 'points', 'clusters' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = (id === 'points') ? 'active' : '';        
        link.textContent = id;

        link.onclick = function(e) {
            var clickedLayer = mapInstance.getLayerTextContent(e.target.textContent);
            e.preventDefault();
            e.stopPropagation();

            mapInstance.removePopUp();

            var visibility = mapInstance.map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
                mapInstance.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';

                if(clickedLayer === 'clusters'){
                  mapInstance.map.setLayoutProperty("cluster-count", 'visibility', 'none');
                  mapInstance.map.setLayoutProperty("unclustered-point", 'visibility', 'none');
                }
            } else {
                this.className = 'active';
                mapInstance.map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                 if(clickedLayer === 'clusters'){
                  mapInstance.map.setLayoutProperty("cluster-count", 'visibility', 'visible');
                  mapInstance.map.setLayoutProperty("unclustered-point", 'visibility', 'visible');
                }
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
      }
  }

  addFilterItemEvent(){

  }

  getLayerTextContent(id){
    if (id === "points") return "dar-trash";
    else if (id === "clusters") return "clusters";
  }

  createPopUp(currentFeature) {

    var popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<div><a href="#exampleModal" data-toggle="modal" class="img1" id="meta3">'+
        '<img src="'+ currentFeature.properties.imp +'" class="image_path"/></a></div>')
      .addTo(this.map);
  }

  //Helpers

  getLayerPosition(name){
    var layers = this.map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      // console.log(layers[i].type + " " + layers[i].id);
        if (layers[i].type === name) {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    return firstSymbolId;
  }

  removeLayerFromMap(id){
   if(this.map.getLayer(id)) this.map.removeLayer(id);
  }

  removePopUp(){
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();
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
    active: state.active,
    activeLegend: state.activeLegend
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;

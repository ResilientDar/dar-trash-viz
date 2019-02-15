import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
import { setCurrentFeature } from '../redux/features'
import { addActiveLayer } from '../redux/layers'
import { removeActiveLayer } from '../redux/layers'
import { setClusterActive } from '../redux/layers'
import { setFeatures } from '../redux/features'
import data from '../data.json'
import Tooltip from './tooltip'
import ReactDOM from 'react-dom'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdHdlc2EiLCJhIjoiZTc1OTQ4ODE0ZmY2MzY0MGYwMDNjOWNlYTYxMjU4NDYifQ.F1zCcOYqpXWd4C9l9xqvEQ';

export class Map extends React.Component {
  map;
  tooltipContainer;
  tooltipContainerSub;
  tooltipContainerShina;
  activeAnalysisLayer;

  static propTypes = {
    active: PropTypes.object.isRequired,
    selectedStops: PropTypes.array.isRequired,
    currentFeature: PropTypes.object,
    analysisActive: PropTypes.bool,
    zoomToFeature:  PropTypes.bool,
    activeLayers: PropTypes.array,
    analysisOptions: PropTypes.array,
  };

  state = {
            pointsActive: false,
            clustersActive: true
          };

  componentDidUpdate() {

    // if(this.map.loaded()){

      this.setColor();
      this.setFilter();
      this.zoomToFeature();
    // }
  }

  componentDidMount() {

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/samtwesa/cjnrbl5zc1u6b2smsvrep1rqq',
      center: [39.182384, -6.783038],
      zoom: 11,
      maxZoom: 20
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
      this.addWards();
      this.addSubWards();
      this.addShinas();
      this.addDroneImagery();
      this.addRivers();
      this.addStreams();
      // this.addHouses();
      this.addDrainPiles();
      // this.addBRTPiles();
      this.addDrainageNetwork();
      this.addBRTNetwork();
      this.setToolTipDiv();
      // this.setFill();

      this.setColor();
      this.setFilter();
      this.zoomToFeature();

    });

    this.createLayerControl(this);
    this.clickEventsOnPoints();
    
  }
  setVisibility(all_layers, selected){

    for (var i = 0; i < all_layers.length; i++) {
      if(all_layers[i] === selected){
        this.map.setLayoutProperty(
          all_layers[i],
           'visibility',
            'visible');
         addActiveLayer(all_layers[i])
      }else{
        this.map.setLayoutProperty(
          all_layers[i],
           'visibility',
            'none');
        // removeActiveLayer(all_layers[i])
      }
    }
  }

  // Customize (add/remove) layers when options are toggled
  setColor() {
    const { property, stops } = this.props.active;

    if(this.props.analysisActive === true){
      if( property === 'dist_cm'){

        // this.map.setPaintProperty('drains-piles', 'circle-color', {
        //   property,
        //   stops,
        //   type: "categorical"
        // }); 
        this.activeAnalysisLayer = 'drains-piles'

        this.map.setLayoutProperty('drains-piles', 'visibility', 'visible');
        this.map.setLayoutProperty('wards', 'visibility', 'none');
        this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
        this.map.setLayoutProperty('shinas', 'visibility', 'none');
      }
      else if( property === 'trash_sub'){

        this.activeAnalysisLayer = 'sub-wards'

        this.map.setPaintProperty('sub-wards', 'fill-color', {
          property,
          stops
        }); 

        this.map.setLayoutProperty('sub-wards', 'visibility', 'visible');
        this.map.setLayoutProperty('wards', 'visibility', 'none');
        this.map.setLayoutProperty('shinas', 'visibility', 'none');
        this.map.setLayoutProperty('drains-piles', 'visibility', 'none');
      }

      else if( property === 'trash_sh'){

        this.activeAnalysisLayer = 'shinas'

        this.map.setPaintProperty('shinas', 'fill-color', {
          property,
          stops
        }); 
        
        this.map.setLayoutProperty('shinas', 'visibility', 'visible');
        this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
        this.map.setLayoutProperty('wards', 'visibility', 'none');
        this.map.setLayoutProperty('drains-piles', 'visibility', 'none');
      }

      else if( property === 'ga'){

        this.activeAnalysisLayer = 'image'

        var points = document.getElementById('points');
        points.className = points.className || 'active';

        this.map.setLayoutProperty('dar-trash', 'visibility', 'visible');

        this.map.setPaintProperty('dar-trash', 'circle-color', {
          property,
          stops,
          type: "categorical"
        });
        
        // this.map.setLayoutProperty('shinas', 'visibility', 'none');
        // this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
        // this.map.setLayoutProperty('wards', 'visibility', 'none');
        this.map.setLayoutProperty('drains-piles', 'visibility', 'none');
      }

      else{
        this.activeAnalysisLayer = 'wards'

        this.map.setPaintProperty('wards', 'fill-color', {
          property,
          stops
        });

        this.map.setLayoutProperty('wards', 'visibility', 'visible');
        this.map.setLayoutProperty('drains-piles', 'visibility', 'none');
        this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
        this.map.setLayoutProperty('shinas', 'visibility', 'none');
      }
    }
    else{

      this.map.setLayoutProperty('wards', 'visibility', 'none');
      this.map.setLayoutProperty('shinas', 'visibility', 'none');
      this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
      this.map.setLayoutProperty('drains-piles', 'visibility', 'none');

      this.activeAnalysisLayer = ''

      this.map.setPaintProperty('dar-trash', 'circle-color', {
      property,
      stops,
      type: "categorical"
      });

      this.map.setPaintProperty('dar-trash', 'circle-stroke-color', "white"); 
      this.map.setPaintProperty('dar-trash', 'circle-stroke-width', 0.3); 
    }
  }

  //Filter function for the layer in the map
  setFilter() {
    const { property, stops } = this.props.active;
    
    const selectedStops = this.props.selectedStops;
    const arr = this.buildFilter(selectedStops, property);

    if(selectedStops != null & (this.props.analysisActive !== true) ){
       this.map.setFilter('dar-trash', arr);
       // Apply filter to clusters layers also

       // try {
       //      if(this.map.getLayer('clusters') != null){
       //        this.map.setFilter('clusters', arr);
       //   }
       // }
       //  catch(error) {
       //     console.log('Error');
       // }
   
    }else{
      if(this.activeAnalysisLayer !== undefined && 
        this.activeAnalysisLayer !== '' ){

        if(this.activeAnalysisLayer === 'image' ){
           this.map.setFilter('dar-trash', arr);
        }
        else{
            var activeFilter = this.buildBoundaryFilter(
              selectedStops,
               property) 
            this.map.setFilter(this.activeAnalysisLayer, activeFilter);
         }
      }
    }
  }


  setTooltip(features, layer) {
    if (features.length) {
      if (layer === 'wards'){
        ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
      }else if(layer === 'sub-wards'){
         ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainerSub
      );
      }
      else if(layer === 'shinas'){
         ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainerShina
      );
      }
      
    } else {
      this.tooltipContainer.innerHTML = '';
      this.tooltipContainerSub.innerHTML = '';
      this.tooltipContainerShina.innerHTML = '';
    }
  }

  setToolTipDiv(){
    this.tooltipContainer = document.createElement('div');
    this.tooltipContainerSub = document.createElement('div');
    this.tooltipContainerShina = document.createElement('div');
  }


  clickEventsOnPoints(){
    this.map.on('click', (e) => {

      console.log(e.point);

      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['dar-trash', 'brt-piles', 'drains-piles'] });

      // this.removePopUp();

      if (features.length) {
        var clickedPoint = features[0];
        // Close all other popups and display popup for clicked point
        setCurrentFeature(clickedPoint, true);
        this.highlightSelectedFeature(clickedPoint);
      }    
    });

    // Get feature data from the dar-trash layer instead
    // from the cluster source, this improves perfomance

    this.map.on('click', 'unclustered-point', (e) => {
      
      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['dar-trash'] });

      if (features.length) {
        var clickedPoint = features[0];
        setCurrentFeature(clickedPoint, true);
        this.highlightSelectedFeature(clickedPoint);
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

    this.mouseEventsAnalysis();

    this.map.on('mouseenter','drains-piles', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
  }

  mouseEventsAnalysis(){
    // TODO refactor method of assign events use loop
    // var analysisLayers = ['sub-wards', 'wards' ];

    this.map.on('mousemove', 'wards', (e) => {

      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['wards'] });

      //Show only one feature details, log as error
      if(features.length > 1) {
        features = [features[0]];
        console.error("Layer has overlapping polygons");
      }

      var tooltip = new mapboxgl.Marker(this.tooltipContainer, {
        offset: [-120, 0]
        }).setLngLat([0,0]).addTo(this.map);

      tooltip.setLngLat(e.lngLat);
      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';

      this.setTooltip(features, 'wards');

    });

    this.map.on('mouseleave', 'wards', (e) => {
        this.map.getCanvas().style.cursor = '';
        this.tooltipContainer.innerHTML = '';
    });

    this.map.on('mousemove', 'sub-wards', (e) => {
      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['sub-wards'] });
      
      //Show only one feature details, log as error
      if(features.length > 1) {
        features = [features[0]];
        console.error("Layer has overlapping polygons");
      }

      var tooltipSub = new mapboxgl.Marker(this.tooltipContainerSub, {
        offset: [-120, 0]
        }).setLngLat([0,0]).addTo(this.map);

      tooltipSub.setLngLat(e.lngLat);
      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';

      this.setTooltip(features, 'sub-wards');

    });

    this.map.on('mouseleave', 'sub-wards', (e) => {
      this.map.getCanvas().style.cursor = '';
      this.tooltipContainerSub.innerHTML = '';
    });

    this.map.on('mousemove', 'shinas', (e) => {
      var features = this.map.queryRenderedFeatures(e.point,
       { layers: ['shinas'] });

      //Show only one feature details, log as error
      if(features.length > 1) {
        features = [features[0]];
        console.error("Layer has overlapping polygons");
      }

      var tooltipShina = new mapboxgl.Marker(this.tooltipContainerShina, {
        offset: [-120, 0]
        }).setLngLat([0,0]).addTo(this.map);

      tooltipShina.setLngLat(e.lngLat);
      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';


      this.setTooltip(features, 'shinas');

    });

    this.map.on('mouseleave', 'shinas', (e) => {
      this.map.getCanvas().style.cursor = '';
      this.tooltipContainerShina.innerHTML = '';
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

  addWards(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'wards',
        type: 'fill',
        source: 'wards',
        }, 'dar-trash');

    this.map.setPaintProperty('wards', 'fill-opacity', 0.6);
    this.map.setPaintProperty('wards', 'fill-outline-color', '#18a6b9');

    this.map.setLayoutProperty('wards', 'visibility', 'none');
  }

  addSubWards(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'sub-wards',
        type: 'fill',
        source: 'sub-wards',
        }, 'dar-trash');

    // this.map.setPaintProperty('sub-wards', 'fill-color', '#ccc');
    this.map.setPaintProperty('sub-wards', 'fill-opacity', 0.6);
    this.map.setPaintProperty('sub-wards', 'fill-outline-color', '#18a6b9');

    this.map.setLayoutProperty('sub-wards', 'visibility', 'none');
  }

  addShinas(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'shinas',
        type: 'fill',
        source: 'shinas',
        }, 'dar-trash');

    // this.map.setPaintProperty('sub-wards', 'fill-color', '#ccc');
    this.map.setPaintProperty('shinas', 'fill-opacity', 0.6);
    this.map.setPaintProperty('shinas', 'fill-outline-color', '#18a6b9');

    this.map.setLayoutProperty('shinas', 'visibility', 'none');
  }

  addDroneImagery(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'drone-imagery',
        type: 'fill',
        source: 'drone-imagery',
        }, 'dar-trash');

    this.map.setLayoutProperty('shinas', 'visibility', 'none');
  }

  addRivers(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'rivers',
        type: 'line',
        source: 'rivers',
        }, 'dar-trash');

    this.map.setPaintProperty('rivers', 'line-color', '#7eb8e0');
    this.map.setPaintProperty('rivers', 'line-width', 3);
    this.map.setLayoutProperty('rivers', 'visibility', 'none');
  }

  addStreams(){

    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'streams',
        type: 'line',
        source: 'streams',
        }, 'dar-trash');
    

    this.map.setPaintProperty('streams', 'line-color', '#06a294');
    this.map.setPaintProperty('streams', 'line-width', 2);
    this.map.setLayoutProperty('streams', 'visibility', 'none');
  }

  addDrainPiles(){
    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'drains-piles',
        type: 'circle',
        source: 'drains-piles',
        }, 'dar-trash');

    this.map.setPaintProperty('drains-piles', 'circle-color', '#869202'); 

    // this.map.setLayoutProperty('household', 'visibility', 'none');
  }

  addBRTPiles(){
    // this.removeLayerFromMap('dar-trash');

    this.map.addLayer({
        id: 'brt-piles',
        type: 'circle',
        source: 'brt-piles',
        }, 'dar-trash');

    this.map.setPaintProperty('brt-piles', 'circle-color', '#0876dd'); 

    // this.map.setLayoutProperty('household', 'visibility', 'none');
  }

  addDrainageNetwork(){
    var id = this.getLayerPosition('symbol');

    this.map.addLayer({
        id: 'drainage',
        type: 'line',
        source: 'drainage',
        layout: {
          visibility :  'none'
        }

        }, id);
    this.map.setPaintProperty('drainage', 'line-color', '#efbc15');
    this.map.setPaintProperty('drainage', 'line-width', 3);
    this.map.setLayoutProperty('drainage', 'visibility', 'none');
  }

  addBRTNetwork(){
    var id = this.getLayerPosition('symbol');

    this.map.addLayer({
        id: 'BRT',
        type: 'line',
        source: 'BRT',
        layout: {
          visibility :  'none'
        }

        }, id);
    this.map.setPaintProperty('BRT', 'line-color', '#1d81a5');
    this.map.setPaintProperty('BRT', 'line-width', 3);
    this.map.setLayoutProperty('BRT', 'visibility', 'none');
  }


  clusters(){

    this.map.addSource("trash", {
        type: "geojson",
        data: data,
        cluster: true, // Enable clustering
        clusterRadius: 50, // Radius of each cluster when clustering points
        clusterMaxZoom: 20 // Max zoom to cluster points on
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

    // Inspect a cluster on click
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

  // Add wards layer into the map

  createLayerControl(mapInstance){

    var toggleableLayerIds = [ 'points', 'drone imagery', 'clusters',
    'rivers', 'streams', 'drainage', 'BRT' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = (id === 'points') ? 'active' : '';
        link.style = ((id === 'drainage' || id === 'BRT' ) || ( id === 'streams' )) ? 'display: none;': '';
        link.textContent = id;
        link.id = id;

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
                  setClusterActive(false);
                  mapInstance.map.setLayoutProperty("cluster-count", 'visibility', 'none');
                  mapInstance.map.setLayoutProperty("unclustered-point", 'visibility', 'none');
                }
            } else {
                this.className = 'active';
                mapInstance.map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                 if(clickedLayer === 'clusters'){
                  mapInstance.map.setLayoutProperty("cluster-count", 'visibility', 'visible');
                  mapInstance.map.setLayoutProperty("unclustered-point", 'visibility', 'visible');
                  setClusterActive(true);
                }
                
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);

      }
      // Adding a control span for showing and adding extra layers

        var span = document.createElement('span');
        span.className = 'more-list fr';
        span.textContent = 'more';

        var drainage = document.getElementById('drainage');
        var brt = document.getElementById('BRT');
        var streams = document.getElementById('streams');

        span.onclick = function(e) {
          if(this.textContent === 'more') {
            drainage.style = 'display: block;';
            brt.style = 'display: block;';
            streams.style = 'display: block;';

            this.textContent = 'less';
          }else{
            drainage.style = 'display: none;';
            brt.style = 'display: none;';
            streams.style = 'display: none;';
            
            this.textContent = 'more';
          }
        };
       var menu = document.getElementById('menu');
       menu.appendChild(span);
  }

  zoomToFeature(){
    if(this.props.zoomToFeature && this.props.currentFeature){
      this.map.easeTo({
                  center: this.props.currentFeature.geometry.coordinates,
                  zoom: 20
      });

      // this.setState({zoomToFeature: false});
    }
    
  }

  highlightSelectedFeature(feature){

    this.removeSelectedFeatureLayer();
    
    this.map.addSource('selectedFeature', {
        "type":"geojson",
        "data": feature.toJSON()
    });
    this.map.addLayer({
        "id": "selectedFeature",
        "type": "circle",
        "source": "selectedFeature",
        "paint": {
            "circle-color": "#3887be",
            "circle-radius": 6,
            "circle-stroke-color": "white",
            "circle-stroke-width": 1
        }
    });
  }

  removeSelectedFeatureLayer(){
    if(this.map.getLayer("selectedFeature") !== undefined){
      this.map.removeLayer("selectedFeature");
      this.map.removeSource("selectedFeature");
    }
  }


  /* Helpers
   */

  getLayerTextContent(id){
    if (id === "points") return "dar-trash";
    else if (id === "clusters") return "clusters";
    else if (id === "drone imagery") return "drone-imagery";
    else return id;
  }


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

  buildFilter(arr, property) {
    var filter = ['in', property];

    if (arr.length === 0) {
       return filter;
    }
    
    for(var i = 0; i < arr.length; i += 1) {
      filter.push(arr[i]);
    }
    
    return filter;
  }

  // Creates a mapbox layer filter for the boundary layers

  buildBoundaryFilter(selectedStops, property){

    var wardStops = [0, 40, 100, 300, 700]
    var shinaStops = [0, 5, 10, 20, 50, 100]

    var filter = ['any']
    var stops = selectedStops.sort(this.sortHelper)
    var index;
    var legendStops;

    if(property === 'trash_sh'){
      legendStops = shinaStops
    }else{
      legendStops = wardStops
    }
      for (var i = 0; i < stops.length; i++) {

        index = legendStops.indexOf(stops[i]);

        if(i === 0){
          if(stops[i] === 0){
            filter.push(["<=", property, 0])
          }else{
            if(index !== -1){
              filter.push(["all",
               [">", property, legendStops[index - 1]],
                ["<=", property, legendStops[index]]])
            }
          }
        }
        else if(i === stops.length - 1){
            if(index !== -1){
              if(index === legendStops.length - 1){
                filter.push(["all", 
                  [">", property, legendStops[index - 1]],
                ["<=", property, legendStops[index]]])
                filter.push([">",
                 property, legendStops[index]])
              }
            } 
        }
        else{
            if(index !== -1){
              filter.push(["all", [">", 
                property, legendStops[index - 1]],
                ["<=", property, legendStops[index]]])
            }
        }
      }
    return filter
  }

  getIndex(array, value){
    for(var i = 0; i < array.length; i++){
      if( array[i] === value) return i;
    }
    return -1;
  }

  //TODO use merge sort
  sortArray(array, value){
  }

  sortHelper(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
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
  let mainState = state["main"]
  return {
    active: mainState.active,
    selectedStops: mainState.selectedStops,
    currentFeature: mainState.currentFeature,
    analysisActive: mainState.analysisActive,
    zoomToFeature:  mainState.zoomToFeature,
    activeLayers: mainState.activeLayers,
    analysisOptions: mainState.analysisOptions
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;

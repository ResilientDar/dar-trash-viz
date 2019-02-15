
// Helpers

export function assignSelectedStops(stops){
  var selectedStops = [];
  if(stops === undefined) return selectedStops;

  for (var i = 0; i < stops.length; i++) {
      selectedStops[i] = stops[i][0];
  }
  return selectedStops;
}

export function contains(selectedStops, stop){
  return selectedStops.includes(stop);
}

export function addStop(selectedStops, stop){
  // make a separate array copy
  var slicedStops = selectedStops.slice();

  if( stop === undefined) return slicedStops;

  slicedStops.push(stop);

  return slicedStops;
}

export function removeStop(selectedStops, stop){
  // make a separate array copy
  var slicedStops = selectedStops.slice();

  var index = selectedStops.indexOf(stop);
  slicedStops.splice(index, 1);

  return slicedStops;
}

export function addLayer(layers, layer){
  // make a separate array copy
  var slicedLayers = layers.slice();

  if( layer === undefined) return slicedLayers;

  slicedLayers.push(layer);

  return slicedLayers;
}

export function removeLayer(layers, layer){
  // make a separate array copy
  var slicedLayers = layers.slice();

  var index = layers.indexOf(layer);
  slicedLayers.splice(index, 1);

  return slicedLayers;
}

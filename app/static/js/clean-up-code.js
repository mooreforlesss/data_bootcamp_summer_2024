function createMap(features) {
    // STEP 1: Init the Base Layers
  
    // Define variables for our tile layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Step 2: Create the Overlay layers
    let heatArray = [];
  
    // for each row, add to heat layer array
    for (let i = 0; i < features.length; i++) {
  
      let location = features[i].geometry;
      if (location) {
        let point = [location.coordinates[1], location.coordinates[0]];
        heatArray.push(point);
      }
    }
  
    // create layer
    let heatLayer = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    });
  
    // Step 3: BUILD the Layer Controls
  
    // Only one base layer can be shown at a time.
    let baseLayers = {
      Street: street,
      Topography: topo
    };
  
    let overlayLayers = {
      Heatmap: heatLayer
    }
  
    // Step 4: INIT the Map
    let myMap = L.map("map", {
      center: [-32.8, 117.9],
      zoom: 7,
      layers: [street, heatLayer]
    });
  
  
    // Step 5: Add the Layer Control filter + legends as needed
    L.control.layers(baseLayers, overlayLayers).addTo(myMap);
  }
  
  function doWork() {
  
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson";
    d3.json(url).then(function (data) {
      let user_inp = "Existing";
  
      // filter data on user input
      let features = data.features;
      let filtered_data = features.filter(x => x.properties.status === user_inp);
      createMap(filtered_data);
    });
  }
  
  
  doWork();
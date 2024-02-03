mapboxgl.accessToken = 'pk.eyJ1IjoibHUyMDAyIiwiYSI6ImNsczVvNmtuMjFtbmsyaW85dGtvMGwzY3oifQ.tp2BJEaVd8-AnQZ310kBNw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-98.5795, 39.8283],
    zoom: 3,
    projection: 'albers'
});

map.on('load', function () {
    map.addSource('covid-data', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
      'id': 'covid-rates-layer',
      'type': 'fill',
      'source': 'covid-data',
      'layout': {},
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'rates'],
          0, '#abb7ed',
          20, '#d9a138',
          40, '#a860cc',
          60, '#dd5ca8',
          80, '#56c798',
          100, '#9f43d7'
        ],
        'fill-opacity': 0.75
      }
    });

    map.on('click', 'covid-rates-layer', function (e) {
      if (e.features.length > 0) {
        const feature = e.features[0];
        const rate = feature.properties.rates;
        const state = feature.properties.state;
        const county = feature.properties.county;
        const popupContent = `<h3>${county}, ${state}</h3>
        <p>Rate: ${rate ? rate : 'No data'} per 100,000</p>`;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
      }
    });

    map.on('mouseenter', 'covid-rates-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'covid-rates-layer', function () {
        map.getCanvas().style.cursor = '';
    });

    var legend = document.getElementById('legend');
    var description = document.getElementById('description');
    description.innerHTML = '<strong>Map Title: COVID-19 Rates in the US</strong><p>This map visualizes the COVID-19 infection rates across different states and county. Data sources: "The New York Times"</p>';
});

mapboxgl.accessToken = 'pk.eyJ1IjoibHUyMDAyIiwiYSI6ImNsczVqdHRwNDBobW8ycm83Z2xkcWFyam8ifQ.2uZ34JA9aqSJaXj9VqJaog';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 38],
  zoom: 4
});

map.on('load', function () {
  map.addSource('covid', {
    'type': 'geojson',
    'data': 'assets/us-covid-2020-counts.geojson'
  });

  map.addLayer({
    'id': 'covid-cases',
    'type': 'circle',
    'source': 'covid',
    'paint': {
      'circle-radius':
      ['interpolate', ['linear'], ['get', 'cases'], 1, 4, 100000, 24],
      'circle-color':
      ['interpolate', ['linear'], ['get', 'cases'], 1, '#f29df5',
      10000, '#c19df5',
      50000, '#9e9df5',
      100000, '#9dccf5',
      500000, '#9df5eb',
      1000000, '#9df5b0'
      ], 'circle-opacity': 0.75
    }
  });

  map.on('click', 'covid-cases', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var cases = e.features[0].properties.cases;

    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML('COVID-19 Cases: ' + cases)
    .addTo(map);
  });

  map.on('mouseenter', 'covid-cases', function () {
    map.getCanvas().style.cursor = 'pointer';
  })

  map.on('mouseleave', 'covid-cases', function () {
    map.getCanvas().style.cursor = '';
  });
});
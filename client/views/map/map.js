/*****************************************************************************/
/* Map: Lifecycle hooks */
/*****************************************************************************/

Template.MapLocationPicker.rendered = function () {

  L.Icon.Default.imagePath = '/packages/leaflet/images';
  // create a map in the "map" div, set the view to Trondheim and zoom to get most of Norway
  var map = L.map('map', {doubleClickZoom: false}).setView([63.43, 10.39], 5);

  map.addControl( new L.Control.Search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon']
  }) );

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var locationAdded = false;

  map.on('dblclick', function(e) {
    if(!locationAdded) {
      var marker = L.marker(e.latlng).addTo(map)
        .on('click', function(event) {
          if(locationAdded) {
            map.removeLayer(marker);
            locationAdded = false;
          }
        });
      locationObject.setCoordinates(e.latlng);
      locationAdded = true;
    }
  });

  Deps.autorun(function () {
    var report = Router.getData();
    if(report && report.project && report.project.location && report.project.location.coordinates && report.project.location.coordinates.lat) {
      var coords = report.project.location.coordinates;
      locationObject.setCoordinates(coords);  
      locationAdded = true

      var marker = L.marker([coords.lat, coords.lng]).addTo(map).on('click', function(event) {
        if(locationAdded) {
          map.removeLayer(marker);
          locationAdded = false;
        }
      });;
    }
  });
};


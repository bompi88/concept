/*****************************************************************************/
/* Map: Lifecycle hooks */
/*****************************************************************************/

Template.MapView.rendered = function () {

  L.Icon.Default.imagePath = '/packages/leaflet/images';
  // create a map in the "map" div, set the view to Trondheim and zoom to get most of Norway
  var map = L.map('map', {doubleClickZoom: false}).setView([63.43, 10.39], 5);

  //add a map control to search for places from the nominatim database
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



  if(this.data.state === 'reportLocationPicker') {
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

        });

      }

    });
  }

  else if(this.data.state === 'reportLocation') {
    Deps.autorun(function() {
      var reports = Reports.find({});

      reports.forEach(function (report) {
        var mapDiv =  L.DomUtil.create("div","lbqs");
        report.mapPopup = true;
        UI.insert(UI.renderWithData(Template.ProjectInformationBox, report), mapDiv);
        if(report && report.project && report.project.location && report.project.location.coordinates && report.project.location.coordinates.lat && report.project.location.coordinates.lng) {
            // add a marker in the given location, attach some popup content to it 
            var marker = L.marker([report.project.location.coordinates.lat, report.project.location.coordinates.lng]).bindLabel(report.project.name, {noHide: true}).addTo(map);
            marker.bindPopup(mapDiv);
          }
        });
    });

  }

};


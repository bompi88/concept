/**
 * Map: This is a map component
 */

Template.MapView.events({
  'click .panel': function(event, tmpl) {
    //this is ugly
    var id = document.getElementsByClassName('report-id')[0].id;
    Router.go('/reports/' + id);
  }
});

Template.MapView.rendered = function () {
  var state = this.data.state;

  GoogleMaps.init(
    {
        //'sensor': true, //optional
        'key': 'AIzaSyDgiWBq5ehQ0Dk8MabpXXaFy7WAACAusBM', //optional
        'language': 'no', //optional
        'libraries': 'places'
    },
      function(){

        var markers = [];
        var mapOptions = {
            zoom: 5,
            maxZoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        map.setCenter(new google.maps.LatLng( 63.43, 10.39 ));
        var infowindow = new google.maps.InfoWindow();
        var markerSize = { x: 22, y: 40 };

        google.maps.Marker.prototype.setLabel = function(label){
          this.label = new MarkerLabel({
            map: this.map,
            marker: this,
            text: label
          });
          this.label.bindTo('position', this, 'position');
        };

        var MarkerLabel = function(options) {
          this.setValues(options);
          this.span = document.createElement('span');
          this.span.className = 'map-marker-label';
        };

        MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
          onAdd: function() {
            this.getPanes().overlayImage.appendChild(this.span);
            var self = this;
            this.listeners = [google.maps.event.addListener(this, 'position_changed', function() { self.draw();})];
          },
          draw: function() {
            var text = String(this.get('text'));
            var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
            this.span.innerHTML = text;
            this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
            this.span.style.top = (position.y - markerSize.y + 40) + 'px';
          }
        });

        if(state === 'reportLocationPicker') {

          // keeps track of whenever a user adds a location.
          // We only want the user to add at maximum one marker
          var locationAdded = false;

          // Create the search box and link it to the UI element.
          var input = document.getElementById('pac-input');
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          var searchBox = new google.maps.places.SearchBox(input);

          // Listen for the event fired when the user selects an item from the
          // pick list. Retrieve the matching places for that item.
          google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
              return;
            }

            for (var i = 0, marker; marker = markers[i]; i++) {
              marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();

            for (var i = 0, place; place = places[i]; i++) {
              var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.
              var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
              });

              markers.push(marker);

              bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
          });

          // Event listeners to handle click etc.

          google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
          });

          google.maps.event.addListener(map, 'click', function(e) {
            if(!locationAdded) {
              var marker = new google.maps.Marker({
                position: e.latLng,
                map: map
              });
              marker.setMap(map);

              google.maps.event.addListener(marker, 'dblclick', function(event) {
                if(locationAdded) {
                  marker.setMap(null);
                  locationAdded = false;
                  locationObject.setCoordinates({});
                }
              });

              locationObject.setCoordinates({"lat":e.latLng.lat().toString(), "lng":e.latLng.lng().toString()});
              locationAdded = true;
            }
          });

          // If the data gets updated.
          Deps.autorun(function () {
            var report = Router.getData();
            if(report && report.project && report.project.location &&
              report.project.location.coordinates &&
              report.project.location.coordinates.lat && report.project.location.coordinates.lng) {

              var coords = report.project.location.coordinates;

              locationObject.setCoordinates(coords);
              locationAdded = true

              var pos = new google.maps.LatLng(parseFloat(coords.lat), parseFloat(coords.lng));

              var marker = new google.maps.Marker({
                position: pos,
                map: map
              });

              marker.setMap(map);

              google.maps.event.addListener(marker, 'dblclick', function(event) {
                if(locationAdded) {
                  marker.setMap(null);
                  locationAdded = false;
                  locationObject.setCoordinates({});
                }
              });
            }
          });
        }

        else if(state === 'reportLocation') {
          Deps.autorun(function(){

            var reports = Reports.find({});

            reports.forEach(function (report) {

              report.mapPopup = true;

              if(report && report.project && report.project.name &&
                report.project.location && report.project.location.coordinates &&
                report.project.location.coordinates.lat && report.project.location.coordinates.lng) {

                var div = document.createElement('div');

                UI.insert(UI.renderWithData(Template.ProjectInformationBox, report), div);

                //an ugly hack to map a report id to a infowindow
                $('<div id="' + report._id + '" class="report-id"> </div>').appendTo(div.getElementsByClassName('panel-default'));

                infowindow.setContent(div.innerHTML);

                var marker = new google.maps.Marker({
                position: new google.maps.LatLng(report.project.location.coordinates.lat, report.project.location.coordinates.lng),
                  map: map,
                  label: report.project.name
              });

              marker.setMap(map);
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
              })
            }
          });
        });
      }
    }
  );
};

/*****************************************************************************/
/* Map: Lifecycle hooks */
/*****************************************************************************/

Template.MapView.rendered = function () {

  var state = this.data.state;

  GoogleMaps.init(
    {
        //'sensor': true, //optional
        'key': 'AIzaSyDgiWBq5ehQ0Dk8MabpXXaFy7WAACAusBM', //optional
        'language': 'no' //optional
    }, 
      function(){
        var mapOptions = {
            zoom: 5
            //mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
        map.setCenter(new google.maps.LatLng( 63.43, 10.39 ));
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
          var locationAdded = false;

          google.maps.event.addListener(map, 'dblclick', function(event) {
            if(!locationAdded) {
              var marker = new google.maps.Marker({
                  position: event.latlng,
                 map: map
              });
              marker.setMap(map);

              google.maps.event.addListener(marker, 'click', function(event) {
                if(locationAdded) {
                  marker.setMap(null);
                  locationAdded = false;
                  locationObject.setCoordinates({});
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

            var marker = new google.maps.Marker({
                  position: locationObject,
                map: map
              });
              marker.setMap(map);
              google.maps.event.addListener(marker, 'click', function(event) {
                if(locationAdded) {
                  marker.setMap(null);
                  locationAdded = false;
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

                if(report && report.project && report.project.name && report.project.location && report.project.location.coordinates && report.project.location.coordinates.lat && report.project.location.coordinates.lng) {

                  var div = document.createElement('div');

                  UI.insert(UI.renderWithData(Template.ProjectInformationBox, report), div);

                  var infowindow = new google.maps.InfoWindow({
                    content: div.innerHTML
                  });

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


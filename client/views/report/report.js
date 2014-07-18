/**
 * ReportView: Event Handlers
 */

Session.setDefault('exportReady', false);

var chart;

Template.Report.events({

  'click #export-text': function(event, tmpl) {
    event.stopPropagation();
  },

  'click .edit-btn': function(event, tmpl) {
    Router.go('/report/' + this._id + '/edit');
  },

  'click #desc-button': function(event, tmpl) {
    createModalDialog("Prosjektbeskrivelse", this.project.projectDescription.long);
  }
});

Template.EvaluationParagraph.events({
  'click .read-more': function(event, tmpl) {
    createModalDialog(this.header, this.ref.long);
  }
});

Template.Report.helpers({
  buttonDisabled: function() {
    return !Session.get('exportReady');
  }
});

Template.Report.rendered = function() {

  $('#projectImage a.image-link').magnificPopup({
    type:'image'
  });

  $('#links').magnificPopup({
    delegate: 'a.image-link',
    type:'image',
    gallery: {
      enabled: true
    }
  });

  Deps.autorun(function () {

    var report = Router.getData();

    if (report) {
      var values = _.pluck(_.omit(report.evaluation,'overall'), 'value');

      var data = {
        labels : ["Måloppnåelse", "Virkninger", "Produktivitet", "Samf.øk. lønnsomhet", "Relevans", "Levedyktighet"],
        datasets : [
          {
            fillColor : "rgba(0, 140, 186, 0.3)",
            strokeColor : "rgba(0, 140, 186, 0.9)",
            pointColor : "rgba(0, 140, 186, 0.9)",
            pointStrokeColor : "rgba(0, 140, 186, 1)",
            data : values
          }
        ]
      }

      var options = {
        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,
        //Number - Scale label font size in pixels
        scaleFontSize : 14,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 6,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 1,
        //Number - The centre starting value
        scaleStartValue : 0,
        //Number - Point label font size in pixels
        pointLabelFontSize : 14,
        //String - Point label font colour
        pointLabelFontColor : "rgba(0,0,0,0.8)",
        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.4)",
        //String - Scale label font colour
        scaleFontColor : "rgba(0,0,0,0.8)",
        scaleFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        pointLabelFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        responsive: true,
        onAnimationComplete: function(){
          var button = $("#export-text");
          var dataURL = chart.toBase64Image();
          var link = button.prop("href") + '?spider=';

          // Send only the spider diagram if IE is not detected
          if (!detectIE()) {
            link = link + dataURL.replace('data:image/png;base64,','');
          }

          // Set the new href value
          button.prop("href", link);

          var lastValue;

          // Checks whether the property is correctly set, then sets the session
          // variable which enables the button. This is done in intervals until
          // it's finished.
          var interval = Meteor.setInterval(function() {

            var newValue = button.prop("href");

            if(newValue === lastValue) {
              Session.set('exportReady', true);
              Meteor.clearInterval(interval);
            }

            lastValue = newValue;

          }, 1500);
        }
      }

      // initialize the spider diagram
      var el = $("#spiderEvaluation");
      if (el && el.get(0)) {
        var ctx = el.get(0).getContext("2d");
        chart = new Chart(ctx).Radar(data,options);
      }
    }
  });

  $('body').scrollspy({ target: '#sidebar'});

  // figure out a nice offset from the top of the page
  var scrollTopOffset = 55;

  // catch clicks on sidebar navigation links and handle them
  $('#sidebar li a').on('click', function(evt){
      // stop the default browser behaviour for the click
      // on the sidebar navigation link
      evt.preventDefault();
      // get a handle on the target element of the clicked link
      var $target = $($(this).attr('href'));
      // manually scroll the window vertically to the correct
      // offset to nicely display the target element at the top
      $(window).scrollTop($target.offset().top-(scrollTopOffset));
  });

}

Template.Report.destroyed = function() {
  if(chart)
    chart.destroy();
};

var detectIE = function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}

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
    Router.go('EditReport', {_id: this._id});
  },
  'click .read-more': function(event, tmpl) {
    Session.set(event.currentTarget.id, !(Session.get(event.currentTarget.id) || false));
  }
});

Template.EvaluationParagraph.events({
  'click .read-more': function(event, tmpl) {
    Session.set(this.id, !(Session.get(this.id) || false));
  }
});

Template.EvaluationParagraph.helpers({
  showMoreText: function(id) {
    return Session.get(id) || false;
  }
});

Template.EvaluationParagraph.destroyed = function () {
  Session.set(this.data.id, null);
};

Template.Report.helpers({
  buttonDisabled: function() {
    return !Session.get('exportReady');
  },
  showEvaluation: function() {
    var t = this && this.evaluation;

    if(t) {
      if(t.achievement.short || t.achievement.long
        || t.effects.short || t.effects.long
        || t.overall.short || t.overall.long
        || t.productivity.short || t.productivity.long
        || t.profitability.short || t.profitability.long
        || t.relevance.short || t.relevance.long
        || t.viability.short || t.viability.long) {
        return true;
      }
    }
    return false;
  },
  showMoreText: function(id) {
    return Session.get(id) || false;
  }
});

Template.Report.rendered = function() {

  Tracker.autorun(function () {
    Meteor.defer(function() {
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
    });
    var report = Router._currentController && Router._currentController.data && Router._currentController.data();

    if (report) {
      var criteria = _.omit(report.evaluation,'overall');
      var labels = {"achievement": "Måloppnåelse", "effects": "Virkninger", "productivity": "Produktivitet", "profitability": "Samf.øk. lønnsomhet", "relevance": "Relevans", "viability": "Levedyktighet"};

      for(crit in criteria) {
        if(!criteria[crit].value) {
          if(crit === 'productivity') {
            criteria = _.omit(criteria,'productivity');
            labels = _.omit(labels, 'productivity');
          } else if(crit === 'achievement') {
            criteria = _.omit(criteria,'achievement');
            labels = _.omit(labels, 'achievement');
          } else if(crit === 'effects') {
            criteria = _.omit(criteria,'effects');
            labels = _.omit(labels, 'effects');
          } else if(crit === 'relevance') {
            criteria = _.omit(criteria,'relevance');
            labels = _.omit(labels, 'relevance');
          } else if(crit === 'viability') {
            criteria = _.omit(criteria,'viability');
            labels = _.omit(labels, 'viability');
          } else if(crit === 'profitability') {
            criteria = _.omit(criteria,'profitability');
            labels = _.omit(labels, 'profitability');
          }

        }
      }

      var values = _.map(labels, function(val, key) {
        if (criteria && criteria[key] && criteria[key].value)
          return criteria[key].value;
      });

      var data = {
        labels : _.values(labels),
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
      Meteor.defer(function() {
        // initialize the spider diagram
        var el = $("#spiderEvaluation");
        if (el && el.get(0)) {
          var ctx = el.get(0).getContext("2d");
          chart = new Chart(ctx).Radar(data,options);
        }
      });
    }
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

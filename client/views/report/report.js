Session.setDefault('TextState','short');

/**
 * ReportView: Event Handlers
 */

Template.Report.events({

  'click #image-link': function(event, tmpl) {
    bootbox.dialog({
      title: this.title,
      message: "<img src='" + getUrlById(this.fileId, 'images', {store: 'original'}) + "' class='img-responsive'>" + "<br/>" + "<p class='text-center'>" + "Kilde: " + this.copyright +"</p>"
    });
  },

  'click #export-text': function(event, tmpl) {
    var w = window.open('/pdf/' + this._id);
    setTimeout(function() {
      w.close();
    }, 400)
  },

  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  }
});

Template.EvaluationParagraph.events({
  'click #over-button': function(event, tmpl) {
    createModalDialog("Samlet vurdering", this.evaluation.overall.long);
  },

  'click #prod-button': function(event, tmpl) {
    createModalDialog("Produktivitet", this.evaluation.productivity.long);
  },

  'click #eff-button': function(event, tmpl) {
    createModalDialog("Virkninger", this.evaluation.effects.long);
  },

  'click #rel-button': function(event, tmpl) {
    createModalDialog("Relevans", this.evaluation.relevance.long);
  },

  'click #via-button': function(event, tmpl) {
    createModalDialog("Levedyktighet", this.evaluation.viability.long);
  },

  'click #prof-button': function(event, tmpl) {
    createModalDialog("Samfunnsøkonomisk lønnsomhet", this.evaluation.profitability.long);
  },

  'click #ach-button': function(event, tmpl) {
    createModalDialog("Måloppnåelse", this.evaluation.achievement.long);
  },

  'click #desc-button': function(event, tmpl) {
    createModalDialog("Prosjektbeskrivelse og mål", this.project.projectDescription.long);
  }
});


Template.Report.rendered = function() {


  Deps.autorun(function () {

    var report = Router.getData();

    if (report) {
      var values = _.pluck(_.omit(report.evaluation,'overall'), 'value');

      var data = {
        labels : ["Produktivitet", "Måloppnåelse", "Virkninger", "Relevans", "Levedyktighet", "Samf.øk. lønnsomhet"],
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
        scaleFontSize : 10,
        //Boolean - If we show the scale above the chart data
        //scaleOverlay : true,
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
        pointLabelFontSize : 10,
        //String - Point label font colour
        pointLabelFontColor : "rgba(0,0,0,0.8)",
        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.4)",
        //String - Scale label font colour
        scaleFontColor : "rgba(0,0,0,0.5)",
        //String - Point label font weight
        pointLabelFontStyle : "bold"
      }

      var el = $("#spiderEvaluation");

      if (el.get(0))
        var ctx = el.get(0).getContext("2d");

      var width = $('canvas').parent().width();

      var chart;

      $('canvas').attr("width",width);
      chart = new Chart(ctx).Radar(data,options);
      window.onresize = function(event){
        var width = $('canvas').parent().width();
        $('canvas').attr("width",width);
        chart = new Chart(ctx).Radar(data,options);
      };
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


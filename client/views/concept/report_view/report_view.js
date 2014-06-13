/*****************************************************************************/
/* ReportView: Event Handlers and Helpers */
/*****************************************************************************/
Template.ReportView.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.ReportView.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* ReportView: Lifecycle Hooks */
/*****************************************************************************/
Template.ReportView.created = function () {
};

Template.ReportView.rendered = function () {
  Deps.autorun(function () {
    var report = Router.getData();
    if (report) {
      var values = _.pluck(report.evaluation, 'value');
      var data = {
        labels : ["Produktivitet", "Måloppnåelse", "Virkninger", "Relevans", "Levedyktighet", "Samf.øk. lønnsomhet"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(0,0,255,0.9)",
            pointColor : "rgba(0,0,255,0.9)",
            pointStrokeColor : "#000",
            data : values
          }
        ]
      }

      console.log(data);

      var el = $("#spiderEvaluation");

      if (el.get(0)) {
        var ctx = el.get(0).getContext("2d");
        var chart = new Chart(ctx).Radar(data, options);
      }
    }
  });
  

};

Template.ReportView.destroyed = function () {
};

var options = {

    //Boolean - Whether to show labels on the scale 
  scaleShowLabels : true,
    //Number - Scale label font size in pixels  
  scaleFontSize : 17,
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
  pointLabelFontSize : 18,
    //String - Point label font colour  
  pointLabelFontColor : "#000",
    //String - Colour of the scale line 
  scaleLineColor : "rgba(0,0,0,.4)",

    //String - Scale label font colour  
  scaleFontColor : "#000",

    //String - Point label font weight
  pointLabelFontStyle : "normal",
  


}

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
    var ctx =  $("#spiderEvaluation").get(0).getContext("2d");
    var chart = new Chart(ctx).Radar(data, null);
  });
  

};

Template.ReportView.destroyed = function () {
};


var data = {
  labels : ["Produktivitet", "Måloppnåelse", "Virkninger", "Relevans", "Levedyktighet", "Samfunnsøkonomisk lønnsomhet"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : [5,3,2,6,4,5] //just some example data as of now
    }
  ]
}

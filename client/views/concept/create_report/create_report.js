/*****************************************************************************/
/* CreateReport: Event Handlers and Helpers */
/*****************************************************************************/
Template.CreateReport.events({
  'submit report-form': function (tmpl, err) {
    var name = tmpl.find('#name');

    Reports.insert({name: name}, function() {

    });
  }
});

Template.CreateReport.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* CreateReport: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateReport.created = function () {
};

Template.CreateReport.rendered = function () {
};

Template.CreateReport.destroyed = function () {
};

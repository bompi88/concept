/*****************************************************************************/
/* CreateReport: Event Handlers and Helpers */
/*****************************************************************************/
Template.CreateReport.events({
  'submit #report-form': function (event, tmpl) {
    event.preventDefault();
    
    // our report document
    var doc = {};

    // get all variables
    doc.name = tmpl.find('#name').value;
    doc.sector = tmpl.find('#sector').value;

    // call server side method to insert the document into the database
    Meteor.call('insertReport', doc);

    // redirect to report list (for now)
    Router.go(Router.path('AdminReportList'));
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

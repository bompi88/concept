/*****************************************************************************/
/* AdminReportList: Event Handlers and Helpers */
/*****************************************************************************/
Template.AdminReportList.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.AdminReportList.helpers({
  reports: function() {
    return Reports.find({});
  }
});

/*****************************************************************************/
/* AdminReportList: Lifecycle Hooks */
/*****************************************************************************/
Template.AdminReportList.created = function () {
};

Template.AdminReportList.rendered = function () {
};

Template.AdminReportList.destroyed = function () {
};

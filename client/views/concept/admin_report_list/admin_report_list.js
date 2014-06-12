Session.setDefault('ReportViewState','box');

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
  'click #report-view-option1': function(event, tmpl) {
    Session.set('ReportViewState', 'box');
  },
  'click #report-view-option2': function(event, tmpl) {
    Session.set('ReportViewState', 'table');
  }
});

Template.AdminReportList.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  }
});

Template.TableReportView.helpers({
  reports: function() {
    return Reports.find({});
  }
});

Template.TableReportView.events({
  'click .table-row': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  }
});

Template.BoxReportView.helpers({
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

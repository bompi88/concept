Session.setDefault('TextState','short');

/*****************************************************************************/
/* ReportView: Event Handlers and Helpers */
/*****************************************************************************/

Template.ReportView.events({

  'click #text-view-short': function(event, tmpl) {
    Session.set('TextState', 'short');
  },
  'click #text-view-long': function(event, tmpl) {
    Session.set('TextState', 'long');
  },
  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  }
});

Template.ReportView.helpers({
  textState: function () {
    return Session.get('TextState');
  }
});




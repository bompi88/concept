/**
 * Client Routes
 */
Router.route('/', {
  name: 'ConceptIndex'
});

// -- Report routes ---------------------------------------------------

Router.route('/rapporter/side/:page', {
  name: 'Reports',
  controller: 'ReportsController'
});

Router.route('/rapporter', {
  name: 'ReportsIndex',
  onBeforeAction: function() {
    this.redirect('/rapporter/side/1');
  }
});

Router.route('/opprett', {
  name: 'CreateReport',
  controller: 'AuthRouteController'
});

Router.route('/rapport/:_id/endre', {
  name: 'EditReport',
  template: 'CreateReport',
  controller: 'EditReportController'
});

Router.route('/rapport/:_id/:slug?', {
  name: 'Report',
  controller: 'ReportViewController'
});

// -- Accounts routes --------------------------------------------------

Router.route('/concept-admin', {
  name: 'AdminLogon',
  template: 'LoginForm',
  controller: 'AdminLogonController'
});

Router.route('/concept-admin-forgotton-password', {
  name: 'AdminForgottonPassword',
  template: 'LoginForm'
});

Router.route('/brukere', {
  name: 'UserControl',
  template: 'UserControl',
  controller: 'UserControlController'
});

// -- Miscellaneous routes ---------------------------------------------

Router.route('/om', {
  name: 'AboutConcept'
});

Router.route('/kriterier', {
  name: 'EvaluationCriteria'
});

// -- Server routes ----------------------------------------------------

Router.route('/pdf/:_id', {
  name: 'pdfFile',
  where: 'server',
  controller: 'PDFExportController'
});

Router.route('/csv', {
  name: 'csvFile',
  where: 'server',
  controller: 'CSVExportController'
});

Router.onBeforeAction(function() {
  Session.set('query', {});
  Session.set('searchQuery', '');
  Session.set('searchBy', 'Navn');
  Session.set('filters', []);
  Session.set('sortBy', 'project.name');
  Session.set('sortOrder', 'asc');
  Session.set('sortType', 'string');
  Session.set('showFilter', false);
  this.next();

}, {
  except: ['Reports']
});


if(Meteor.isClient) {
  //where to put this? we need to subscribe for the account field for the user
  Meteor.subscribe('moreUserData');
}

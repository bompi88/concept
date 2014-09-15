/**
 * Client Routes
 */
Router.map(function () {

  this.route('ConceptIndex', {
    path: '/'
  });

  // -- Report routes ---------------------------------------------------

  this.route('Reports', {
    path: '/rapporter/side/:page',
    controller: 'ReportsController'
  });

  this.route('ReportsIndex', {
    path: '/rapporter',
    onBeforeAction: function() {
      this.redirect('/rapporter/0');
    }
  });

  this.route('CreateReport', {
    path: '/opprett',
    controller: 'AuthRouteController'
  });

  this.route('EditReport', {
    path: '/rapport/:_id/endre',
    template: 'CreateReport',
    controller: 'EditReportController'
  });

  this.route('Report', {
    path: '/rapport/:_id/:slug?',
    controller: 'ReportViewController'
  });

  // -- Accounts routes --------------------------------------------------

  this.route('AdminLogon', {
    path: '/concept-admin',
    controller: 'AdminLogonController',
    template: 'LoginForm'
  });

  this.route('AdminForgottonPassword', {
    path: '/concept-admin-forgotton-password',
    template: 'LoginForm'
  });

  this.route('UserControl', {
    path: '/brukere',
    template: 'UserControl',
    controller: 'UserControlController'
  });

  // -- Miscellaneous routes ---------------------------------------------

  this.route('AboutConcept', {
    path: '/om'
  });

  this.route('EvaluationCriteria', {
    path: '/kriterier'
  });
});


//where to put this? we need to subscribe for the account field for the user
Meteor.subscribe('moreUserData');


/**
 * Client Routes
 */
Router.map(function () {

  this.route('ConceptIndex', {
    path: '/'
  });

  // -- Report routes ---------------------------------------------------

  this.route('Reports', {
    path: '/reports/:page',
    controller: 'ReportsController'
  });

  this.route('CreateReport', {
    path: '/create',
    controller: 'AuthRouteController'
  });

  this.route('EditReport', {
    path: '/report/:_id/edit',
    template: 'CreateReport',
    controller: 'EditReportController'
  });

  this.route('Report', {
    path: '/report/:_id',
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

  // -- Miscellaneous routes ---------------------------------------------

  this.route('AboutConcept', {
    path: '/about-concept'
  });

  this.route('EvaluationCriteria', {
    path: '/evaluation-criteria'
  });
});

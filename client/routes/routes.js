/**
 * Client Routes
 */
Router.map(function () {

  this.route('ConceptIndex', {
    path: '/'
  });

  // -- Report routes ---------------------------------------------------

  this.route('ReportList', {
    path: '/reports',
    controller: 'ReportListController'
  });

  this.route('CreateReport', {
    path: '/create',
    controller: 'AuthRouteController'
  });

  this.route('EditReport', {
    path: '/reports/:_id/edit',
    template: 'CreateReport',
    controller: 'EditReportController'
  });

  this.route('Report', {
    path: '/reports/:_id',
    controller: 'ReportViewController'
  });

  this.route('GeneratePdf', {
    path: '/generate-pdf/:_id',
    controller: 'GeneratePdfController'
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

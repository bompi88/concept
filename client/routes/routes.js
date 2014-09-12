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

  this.route('ReportsIndex', {
    path: '/reports',
    onBeforeAction: function() {
      this.redirect('/reports/0');
    }
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

  this.route('UserControl', {
    path: '/user-control',
    template: 'UserControl',
    controller: 'UserControlController'
  });

  // -- Miscellaneous routes ---------------------------------------------

  this.route('AboutConcept', {
    path: '/about-concept'
  });

  this.route('EvaluationCriteria', {
    path: '/evaluation-criteria'
  });
});


//where to put this? we need to subscribe for the account field for the user
Meteor.subscribe('moreUserData');


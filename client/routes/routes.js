/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/

Router.map(function () {
  this.route('ConceptIndex', {
    path: '/',
  });

  this.route('ReportList', {
    path: '/reports',
    controller: 'ReportListController'
  });

  this.route('CreateReport', {
    path: '/create',
    controller: 'CreateReportController'
  });

  this.route('EditReport', {
    path: '/reports/:_id/edit',
    template: 'CreateReport',
    controller: 'EditReportController'
  });

  this.route('ReportView', {
    path: '/reports/:_id',
    controller: 'ReportViewController'
  });

  this.route('AdminLogon', {
    path: '/concept-admin',
    controller: 'AdminLogonController'
  });

  this.route('AdminForgottonPassword', {
    path: '/concept-admin-forgotton-password'
  });

  this.route('AboutConcept', {
    path: '/about-concept'
  });

  this.route('EvaluationCriteria', {
    path: '/evaluation-criteria'
  });
});

SeoCollection.insert({
  route_name: 'EvaluationCriteria',
  title: 'Evalueringskriterier',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Evalueringskriterier',
    'image': '/images/logo.jpg'
  }
});

SeoCollection.insert({
  route_name: 'AboutConcept',
  title: 'Om Concept NTNU',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Om Concept NTNU',
    'image': '/images/logo.jpg'
  }
});

SeoCollection.insert({
  route_name: 'AdminForgottonPassword',
  title: 'Glemt passord',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Glemt passord',
    'image': '/images/logo.jpg'
  }
});
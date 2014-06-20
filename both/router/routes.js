/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase',
  yieldTemplates: {
    'TopNavbar':{to: 'nav'}
  }
});

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
    	controller: 'AdminCreateReportController'
    });

    this.route('EditReport', {
      path: '/reports/:_id/edit',
      template: 'CreateReport',
      controller: 'AdminEditReportController'
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
      path: '/about-concept',
      template: 'NotFound'

    });

    this.route('EvaluationCriteria', {
      path: '/evaluation-criteria',
      template: 'NotFound'
    });



});

Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'Concept NTNU',
        meta: {
          'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
        },
        og: {
          'title': 'Rapporter - etterevaluering av statlige prosjekter',
          'image': '/images/logo.jpg'
        }
      });
    }
});

SeoCollection.insert({
  route_name: 'ReportList',
  title: 'Rapporter - etterevaluering av statlige prosjekter',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Rapporter - etterevaluering av statlige prosjekter',
    'image': '/images/logo.jpg'
  }
});


SeoCollection.insert({
  route_name: 'ConceptIndex',
  title: 'Concept NTNU',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Concept NTNU',
    'image': '/images/logo.jpg'
  }
});

SeoCollection.insert({
  route_name: 'CreateReport',
  title: 'Lag rapport',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Lag rapport',
    'image': '/images/logo.jpg'
  }
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
  route_name: 'AdminLogon',
  title: 'Logg på rapporteringsverktøyet',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Logg på rapporteringsverktøyet',
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

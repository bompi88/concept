/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
	this.route('ConceptIndex', {path: '/'});

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
});


// Meteor.startup(function() {
//  if(Meteor.isClient){
//       return SEO.config({
//         title: 'Manuel Schoebel - MVP Development',
//         meta: {
//           'description': 'Manuel Schoebel develops Minimal Viable Producs (MVP) for Startups'
//         },
//         og: {
//           'image': 'http://manuel-schoebel.com/images/authors/manuel-schoebel.jpg' 
//         }
//       });
//     }
// });




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




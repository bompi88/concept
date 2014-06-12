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

	this.route('AdminReportList', {
    	path: '/reports',
    	controller: 'AdminReportListController'
    });

    this.route('CreateReport', {
    	path: '/create',
    	controller: 'AdminCreateReportController'
    });

    this.route('ViewReport', {
      path: '/reports/:id',
      controller: 'ViewReportController'
    });
});

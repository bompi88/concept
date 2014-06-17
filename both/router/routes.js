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

    this.route('ReportView', {
      path: '/reports/:_id',
      controller: 'ReportViewController'
    });
    this.route('AdminLogon', {
      path: '/bak'
    });
});

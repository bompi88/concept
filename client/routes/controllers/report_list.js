/**
 * ReportListController: Lists the reports
 */
ReportListController = RouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('reports'), Meteor.subscribe('images'), Meteor.subscribe('reports') ];
	}
});

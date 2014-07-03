/**
 * ReportToolController: Filter and export reports
 */
ReportToolController = RouteController.extend({
    waitOn: function () {
        return [ Meteor.subscribe('reports')];
    }
});

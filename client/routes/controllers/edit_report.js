EditReportController = AuthRouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('images'), Meteor.subscribe('files'), Meteor.subscribe('report', this.params._id) ];
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	action: function () {
		this.render();
	}
});
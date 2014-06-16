

AuthRouteController = RouteController.extend({
	onBeforeAction: function() {
	    if(_.isNull(Meteor.user())) {
	      Router.go(Router.path('ConceptIndex'));
	    }
  	}
});

ConceptIndexController = AuthRouteController.extend({
	waitOn: function () {
	},

	data: function () {
	},

	action: function () {
		this.render();
	}
});

ReportListController = RouteController.extend({
  	waitOn: function () {
  		return [Meteor.subscribe('images'), Meteor.subscribe('reports')];
  	},

  	data: function () {
  	},

  	action: function () {
    	this.render();
  	}
});

AdminCreateReportController = AuthRouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('images'), Meteor.subscribe('files') ];
	},

	data: function () {
		
	},

	action: function () {
		this.render();
	}
});

ReportViewController = AuthRouteController.extend({
	waitOn: function () {
		return Meteor.subscribe('report', this.params._id);
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	action: function () {
		this.render();
	}
});
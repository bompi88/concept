

AuthRouteController = RouteController.extend({
	onBeforeAction: function() {
	    if(!Meteor.loggingIn() && !Meteor.user()) {
	      this.redirect('ConceptIndex');
	    }
  	}
});

ConceptIndexController = RouteController.extend({
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

AdminEditReportController = AuthRouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('images'), Meteor.subscribe('files'), Meteor.subscribe('report', this.params._id)];
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	action: function () {
		this.render();
	}
});

AdminLogonController = RouteController.extend({
	waitOn: function () {
		return Meteor.user();
	},
	onBeforeAction: function(pause) {
		if (Meteor.user()) {
	    	if (!Meteor.loggingIn()) {
	      		this.redirect('ReportList');
	    	}
    	}
	},
	action: function () {
		if (!Meteor.user() && !Meteor.loggingIn()) {
			this.render();
		}
	}
});

ReportViewController = RouteController.extend({
	waitOn: function () {
		return [Meteor.subscribe('report', this.params._id), Meteor.subscribe('images'), Meteor.subscribe('files')];
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	action: function () {
		this.render();
	},
	onAfterAction: function() {

		if(this.data()) {
			var report = this.data();
			SEO.set({
				title: "Evaluering av " + report.project.name,
				meta: {
					'description': report.project.projectDescription.short
				},
				og: {
					'title': "Evaluering av " + report.project.name,
					'description': report.project.projectDescription.short
					//todo image 
				}
			});
		}



	}

});
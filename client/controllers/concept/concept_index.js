

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

AdminReportListController = AuthRouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe('reports');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});

AdminCreateReportController = AuthRouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe('reports');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
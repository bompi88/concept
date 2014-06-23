AuthRouteController = RouteController.extend({
	onBeforeAction: function() {
		if(!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('ConceptIndex');
		}
	}
});
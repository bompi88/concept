/**
 * AdminLogonController: Creates a endpoint where a user can log
 * into the system. It renders the login template only if user is
 * not already logged in.
 */
AdminLogonController = RouteController.extend({
	waitOn: function () {
		return Meteor.user();
	},

	onBeforeAction: function(pause) {
    // Redirects user if allready logged in
		if (Meteor.user()) {
			if (!Meteor.loggingIn()) {
				this.redirect('ReportList');
			}
		}
	},

	action: function () {
    // if user is not logged in, render the login template
		if (!Meteor.user() && !Meteor.loggingIn()) {
			this.render();
		}
	}
});

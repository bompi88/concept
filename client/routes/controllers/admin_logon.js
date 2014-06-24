/*****************************************************************************/
/* AdminLogonController */
/*****************************************************************************/

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

SeoCollection.insert({
  route_name: 'AdminLogon',
  title: 'Logg på rapporteringsverktøyet',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Logg på rapporteringsverktøyet',
    'image': '/images/logo.jpg'
  }
});
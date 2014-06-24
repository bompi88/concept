/*****************************************************************************/
/* CreateReportController */
/*****************************************************************************/

CreateReportController = AuthRouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('images'), Meteor.subscribe('files') ];
	},

	data: function () {
		
	},

	action: function () {
		this.render();
	}
});

SeoCollection.insert({
  route_name: 'CreateReport',
  title: 'Lag rapport',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Lag rapport',
    'image': '/images/logo.jpg'
  }
});
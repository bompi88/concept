/*****************************************************************************/
/* EditReportController */
/*****************************************************************************/

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

SeoCollection.insert({
  route_name: 'EditReport',
  title: 'Rediger rapport',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Rediger rapport',
    'image': '/images/logo.jpg'
  }
});
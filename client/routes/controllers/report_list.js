ReportListController = RouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('images'), Meteor.subscribe('reports') ];
	},

	data: function () {
	},

	action: function () {
		this.render();
	}
});

SeoCollection.insert({
  route_name: 'ReportList',
  title: 'Rapporter - etterevaluering av statlige prosjekter',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Rapporter - etterevaluering av statlige prosjekter',
    'image': '/images/logo.jpg'
  }
});
/*****************************************************************************/
/* ConceptIndexController */
/*****************************************************************************/

ConceptIndexController = RouteController.extend({
	waitOn: function () {
    return null;
	},

	data: function () {
	},

	action: function () {
		this.render();
	}
});

SeoCollection.insert({
  route_name: 'ConceptIndex',
  title: 'Concept NTNU',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Concept NTNU',
    'image': '/images/logo.jpg'
  }
});
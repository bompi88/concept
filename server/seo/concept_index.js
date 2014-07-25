/**
 * SEO configuration for ConceptIndex route
 */
Meteor.startup(function() {
  SeoCollection.update({
    route_name: 'ConceptIndex'
  },
  {
    $set: {
      route_name: 'ConceptIndex',
      title: 'Concept NTNU',
      meta: {
        'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
      },
      og: {
        'title': 'Concept NTNU',
        'image': '/images/logo.jpg'
      }
    }
  },
  {
    upsert: true
  });
});

/**
 * SEO configuration for ConceptIndex route
 */
Meteor.startup(function() {
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
});

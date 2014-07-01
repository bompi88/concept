/**
 * SEO configuration for AboutConcept route
 */
Meteor.startup(function() {
  SeoCollection.insert({
    route_name: 'AboutConcept',
    title: 'Om Concept NTNU',
    meta: {
      'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
    },
    og: {
      'title': 'Om Concept NTNU',
      'image': '/images/logo.jpg'
    }
  });
});

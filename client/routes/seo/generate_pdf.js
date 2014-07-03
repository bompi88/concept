/**
 * SEO configuration for GeneratePdf route
 */
Meteor.startup(function() {
  SeoCollection.insert({
    route_name: 'GeneratePdf',
    title: 'Concept NTNU - genererer pdf...',
    meta: {
      'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
    },
    og: {
      'title': 'Concept NTNU - genererer pdf...',
      'image': '/images/logo.jpg'
    }
  });
});

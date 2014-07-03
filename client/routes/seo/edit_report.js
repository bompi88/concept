/**
 * SEO configuration for EditReport route
 */
Meteor.startup(function() {
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
});

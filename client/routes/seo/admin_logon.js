/**
 * SEO configuration for AdminLogon route
 */
Meteor.startup(function() {
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
});

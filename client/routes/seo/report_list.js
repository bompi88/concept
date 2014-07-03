/**
 * SEO configuration for ReportList route
 */
Meteor.startup(function() {
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
});

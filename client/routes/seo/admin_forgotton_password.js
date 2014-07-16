/**
 * SEO configuration for AdminForgottonPassword route
 */
Meteor.startup(function() {
  SeoCollection.insert({
    route_name: 'AdminForgottonPassword',
    title: 'Glemt passord',
    meta: {
      'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
    },
    og: {
      'title': 'Glemt passord',
      'image': '/images/logo.jpg'
    }
  });
});

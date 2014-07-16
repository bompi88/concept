/*
 * Sets default values for the SEO package
 */
Meteor.startup(function() {
  return SEO.config({
    title: 'Concept NTNU',
    meta: {
      'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
    },
    og: {
      'title': 'Rapporter - etterevaluering av statlige prosjekter',
      'image': '/images/logo.jpg'
    }
  });
});

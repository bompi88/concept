/**
 * SEO configuration for Reports route
 */
Meteor.startup(function() {
  SeoCollection.update({
    route_name: 'Reports'
  },
  {
    $set: {
      route_name: 'Reports',
      title: 'Rapporter - etterevaluering av statlige prosjekter',
      meta: {
        description: 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
      },
      og: {
        title: 'Rapporter - etterevaluering av statlige prosjekter',
        image: '/images/logo.jpg'
      }
    }
  },
  {
    upsert: true
  });
});

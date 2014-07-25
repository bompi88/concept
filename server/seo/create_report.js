/**
 * SEO configuration for CreateReport route
 */
Meteor.startup(function() {
  SeoCollection.update({
    route_name: 'CreateReport'
  },
  {
    $set: {
      route_name: 'CreateReport',
      title: 'Lag rapport',
      meta: {
        'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
      },
      og: {
        'title': 'Lag rapport',
        'image': '/images/logo.jpg'
      }
    }
  },
  {
    upsert: true
  });
});

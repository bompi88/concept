/**
 * SEO configuration for EvaluationCriteria route
 */
Meteor.startup(function() {
  SeoCollection.update({
    route_name: 'EvaluationCriteria'
  },
  {
    $set: {
      route_name: 'EvaluationCriteria',
      title: 'Evalueringskriterier',
      meta: {
        'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
      },
      og: {
        'title': 'Evalueringskriterier',
        'image': '/images/logo.jpg'
      }
    }
  },
  {
    upsert: true
  });
});

GeneratePdfController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('report', this.params._id);
  },

  data: function () {
    return Reports.findOne({_id: this.params._id});
  },

	action: function () {
    if(this.ready()) {
      if(typeof this.params._id !== 'undefined' && this.params._id !== 'undefined') {
        Meteor.call('createPdf', Router.getData(), function (error, result) {
          if (error)
            console.log(error);
          
          window.location = result;
        });
      } else {
        window.location = '/';
      }
    }
	}
});

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
GeneratePdfController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('report', this.params._id);
  },

  data: function () {
    return Reports.findOne({_id: this.params._id});
  },

	action: function () {
    if(this.ready()) {
      // Check if a id is present
      if(this.params._id != null && this.params._id !== 'undefined') {
        // Make sure the report is there
        if (this.data) {
          // Generate a pdf document on the server, based on report
          Meteor.call('createPdf', Router.getData(), function (error, result) {
            // If we got a URL, redirect to that address
            if(result)
              window.location = result;
          });
        }
      }
    }
	}
});

/*****************************************************************************/
/* ConceptIndex Publish Functions
/*****************************************************************************/

Meteor.publish('concept_index', function () {
  // you can remove this if you return a cursor
  this.ready();
});

Meteor.publish('reports', function() {
	if(this.userId) {
		console.log(Reports.findOne());
		return Reports.find();
	} else {
		this.stop();
    	return;
	}
});
/*****************************************************************************/
/* ConceptIndex Publish Functions
/*****************************************************************************/

Meteor.publish('concept_index', function () {
  // you can remove this if you return a cursor
  this.ready();
});

Meteor.publish('reports', function() {
	if(this.userId) {
		return Reports.find();
	} else {
		this.stop();
    	return;
	}
});

Meteor.publish('report', function(id) {
	return Reports.find({_id: id});
});

Meteor.publish('images', function() {
	return Images.find({});
});


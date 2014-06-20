/*****************************************************************************/
/* ConceptIndex Publish Functions
/*****************************************************************************/

Meteor.publish('concept_index', function () {
  this.ready();
});

Meteor.publish('reports', function() {
	if(this.userId) {
		return Reports.find();
	} else {
		return Reports.find({ _public: true});
	}
});

Meteor.publish('report', function(id) {
	if(this.userId) {
		return Reports.find({_id: id});
	} else {
		return Reports.find({ $and: [{ _id: id }, { _public: true }] });
	}
});

Meteor.publish('images', function(ids) {
	return Images.find({});
});

Meteor.publish('files', function() {
	return Files.find({});
});
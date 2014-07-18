"use strict";

Meteor.publish('files', function(ids) {

	if(ids) {
		return Files.find({ _id: {$in: ids}});
	} else {
		return Files.find({});
	}
});

Meteor.publish('file', function(id) {
	return Files.find({_id: id});
});

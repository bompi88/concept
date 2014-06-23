Meteor.publish('images', function(ids) {
	return Images.find({});
});
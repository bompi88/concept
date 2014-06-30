Meteor.publish('images', function(ids) {

	if(ids)
		return Images.find({ _id: { $in : ids}});
	else
		return Images.find({});
	
});

Meteor.publish('image', function(id) {
	return Images.find({_id: id});
});
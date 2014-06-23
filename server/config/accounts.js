Meteor.startup(function() {
	if(Meteor.users.find({}).count() < 1) {
		Accounts.createUser({
	        email : 'asd@gmail.com',
	        password : 'asdasd',
	        profile  : {
	        }
	    });
	}
});
Meteor.startup(function() {
	var admEmail = 'asd@gmail.com';
	var admPasswd = 'asd';

	// create a admin user if not allready present
	if(Meteor.users.find({ 'emails.address' : admEmail }).count() == 0) {
		Accounts.createUser({
	        email : admEmail,
	        password : admPasswd,
	        profile  : {
	        }
	    });
	}
});
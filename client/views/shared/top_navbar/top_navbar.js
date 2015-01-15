// username hack

Template._loginButtonsLoggedInDropdown.helpers({
  displayName: function() {
    return "Brukermeny";
  }
});

Template._loginButtonsAdditionalLoggedInDropdownActions.helpers({
  username: function() {
    return Accounts._loginButtons.displayName();
  }
});

Template.TopNavbar.helpers({
	isSuperUser: function() {
    	if(Meteor.user() && Meteor.user().accountType && Meteor.user().accountType === 'admin') {
    		return true;
    	}
  		
  		return false;
  	}
});
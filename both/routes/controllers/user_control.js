UserControlController = RouteController.extend({
  onBeforeAction: function() {
    if((!Meteor.loggingIn() && !Meteor.user()) || (!Meteor.user().accountType && !(Meteor.user().accountType === 'admin'))) {
      this.redirect('ConceptIndex');
      bootbox.alert('Du må være superbruker for håndtere brukere');
    }
    this.next();
  },
  waitOn: function() {
    return Meteor.subscribe('allUsers', Meteor.userId());
  },
  data: function() {
    return {
      users: Meteor.users.find({})
    }
  }
});


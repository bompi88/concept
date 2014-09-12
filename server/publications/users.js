Meteor.publish('allUsers', function(userId) {
  var user = Meteor.users.findOne({ _id: userId });
  if(user && user.accountType && user.accountType === 'admin') {
    return Meteor.users.find({});
  }
  return this.ready();
}
);

Meteor.publish('moreUserData', function() {
  if(this.userId) {
    return Meteor.users.find(this.userId, {fields: {
      accountType: 1,
    }});
  }
  else
    return this.ready();
});

/*****************************************************************************/
/* Concept Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/concept/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
  isLoggedIn: function() {
  	return Meteor.userId();
  }
});

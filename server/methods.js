/*****************************************************************************/
/* Meteor Methods */
/*****************************************************************************/
"use strict";

Meteor.methods({

	toggleReportPublic: function(id, publicity) {
		if(this.userId) {
			return Reports.update({_id: id}, {$set: {"_public": publicity}});
		} else {
			return false;
		}
	},

  totalCount: function(query) {
    return Reports.find(query).count();
  },

  createConceptUser: function(newUserEmail, userId) {
    var user = Meteor.users.findOne({_id: userId});
    if(user && user.accountType && user.accountType === 'admin') {
      var newUserId = Accounts.createUser({
        email: newUserEmail
      });
      //the line under must be there for creating a super user...
      //Meteor.users.update({_id: newUserId}, {$set : {accountType: 'admin'}});

      Accounts.sendEnrollmentEmail(newUserId, newUserEmail);
      return true;
    }
    else
      throw new Meteor.Error(404, 'User is not a super user');
  },

  deleteConceptUser: function(userIdToBeDeleted, userId) {
    var user = Meteor.users.findOne({_id: userId});
    if(user && user.accountType && user.accountType === 'admin') {
      if(Meteor.users.find().count() > 1) {
        if(userIdToBeDeleted == userId) {
          if(Meteor.users.find({ accountType: 'admin' }).count() == 1) {
            throw new Meteor.Error(404, 'Du kan ikke slette den siste superbrukeren');
          } else {
            Meteor.users.remove(userIdToBeDeleted);
          }
        } else {
          Meteor.users.remove(userIdToBeDeleted);
        }
      } else {
        throw new Meteor.Error(404, 'Du kan ikke slette den siste superbrukeren');
      }
    }
    else
      throw new Meteor.Error(404, 'User is not a super user');
  },

  toggleSuperuser: function(id, give) {
    var user = Meteor.users.findOne({_id: this.userId});

    if(user && user.accountType && user.accountType === 'admin') {
      if(give)
        Meteor.users.update({_id: id}, {$set : {accountType: 'admin'}});
      else {
        if(Meteor.users.find().count() > 1) {
          if(id == this.userId) {
            if(Meteor.users.find({ accountType: 'admin' }).count() == 1) {
              throw new Meteor.Error(404, 'Du kan ikke frata rettigheter på den siste superbrukeren');
            } else {
              Meteor.users.update({_id: id}, {$set : {accountType: ''}});
            }
          } else {
            Meteor.users.update({_id: id}, {$set : {accountType: ''}});
          }
        } else {
          throw new Meteor.Error(404, 'Du kan ikke frata rettigheter på den siste superbrukeren');
        }
      }
    } else {
      throw new Meteor.Error(404, 'Du har ikke rettigheter til å gjøre dette');
    }
  }

});
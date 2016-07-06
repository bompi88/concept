/*
 * Copyright 2015 Concept
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*****************************************************************************/
/* Meteor Methods */
/*****************************************************************************/
"use strict";

Meteor.methods({

	deleteReport: function(id) {
		check(id, String);

		if (!Meteor.userId()) {
			return;
		}

		Reports.remove({ _id: id });
	},

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

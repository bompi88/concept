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

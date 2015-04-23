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
"use strict";

Meteor.startup(function() {

	var admEmail = 'asd@gmail.com';
	var admPasswd = 'asd';

	// create a admin user if not allready present
	if(Meteor.users.find({ 'emails.address' : admEmail }).count() === 0) {
		var newUserId = Accounts.createUser({
      email : admEmail,
      password : admPasswd,
      profile  : {}
    });
    Meteor.users.update({_id: newUserId}, {$set : {accountType: 'admin'}});
	}
});


/**
 * Email texts
 */
Accounts.emailTemplates.siteName = "Concepts presentasjonsverktøy";
Accounts.emailTemplates.from = "Concept <accounts@concept.ntnu.no>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
  return "Velkommen til Concepts presentasjonsverktøy!";
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return "Du er så heldig, og har nå fått superbrukerkonto i Concepts sitt presentasjonsvektøy!"
    + " For å aktivere kontoen, klikker du på linken under:\n\n"
    + url;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "Her er redningen!";
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
  return "Hver og en kan glemme passordet sitt i blant."
    + " For å resette passordet, klikker du på linken under:<br><br>"
    + url;
};

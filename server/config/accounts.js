"use strict";

Meteor.startup(function() {

	var admEmail = 'asd@gmail.com';
	var admPasswd = 'asd';

	// create a admin user if not allready present
	if(Meteor.users.find({ 'emails.address' : admEmail }).count() === 0) {
		Accounts.createUser({
      email : admEmail,
      password : admPasswd,
      profile  : {}
    });
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

Template.UserControl.events({
  'click #rem-user': function(event) {
    event.preventDefault();
    Meteor.call('deleteConceptUser', this._id, Meteor.userId(), function(error, result) {
      if(error)
        bootbox.warn(error);
      else
        bootbox.alert('Bruker slettet!');
    });
  },
  'submit form': function(event, tmpl) {
    event.preventDefault();
    try {
      var email = tmpl.find("input[type=email]").value;
      Meteor.call('createConceptUser', email, Meteor.userId(), function(error, result) {
        if(result) {
          bootbox.alert('Du har sendt en epost til den nye brukeren som får mulighet til å lage et passord selv.');
        }
        else {
          bootbox.alert(error.message);
        }

      })

    }
    catch(e){
      bootbox.alert('Noe gikk galt. Prøv på nytt');
    }
  }
});


Template.UserControl.status = function() {
  var status = "";
  if(this.emails && this.emails[0] && this.emails[0] && this.emails[0].verified)
    status += 'Verifisert';
  else
    status += 'Ikke verifisert';

  if(this.accountType && this.accountType === 'admin')
    status += ' og superbruker';

  return status;
};

Template.UserControl.isSuperUser = function() {
  if(Meteor.user() && Meteor.user().accountType && Meteor.user().accountType === 'admin') {
    return true;
  }
  return false;
};

Template.UserControl.events({

  'click #rem-user': function(event) {
    event.preventDefault();
    var that = this;

    // A confirmation prompt before removing the document
    var confirmationPrompt = {
      title: "Bekreftelse på slettingen",
      message: 'Er du sikker på at du vil slette brukeren?',
      buttons: {
        cancel: {
          label: "Nei"
        },
        confirm: {
          label: "Ja",
          callback: function(result) {
            if(result) {
              // Remove the document
              Meteor.call('deleteConceptUser', that._id, Meteor.userId(), function(error, result) {
                if(error)
                  bootbox.alert(error);
                else
                  bootbox.alert('Bruker slettet!');
              });
            }
          }
        }
      }
    }
    bootbox.dialog(confirmationPrompt);
  },

  'click #set-superuser': function(event, tmpl) {
    var that = this;

    // A confirmation prompt before removing the document
    var confirmationPrompt = {
      title: "Bekreftelse på endringen av rettigheter",
      message: 'Er du sikker på at du vil gi ' + (this.emails && this.emails[0] && this.emails[0].address || 'denne brukeren') + ' superbruker rettigheter?',
      buttons: {
        cancel: {
          label: "Nei"
        },
        confirm: {
          label: "Ja",
          callback: function(result) {
            if(result) {
             Meteor.call('toggleSuperuser', that._id, !isSuperUser(that._id), function(error, result) {
                if(error)
                  bootbox.alert(error);
                else
                  bootbox.alert('Brukerrettigheter ble endret!');
              });
            }
          }
        }
      }
    }
    bootbox.dialog(confirmationPrompt);
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

Template.UserControl.helpers({

  status: function() {
    var status = "";
    if(this.emails && this.emails[0] && this.emails[0] && this.emails[0].verified)
      status += 'Verifisert';
    else
      status += 'Ikke verifisert';

    if(this.accountType && this.accountType === 'admin')
      status += ' og superbruker';

    return status;
  },

  isSuperUser: function(id) {
    return isSuperUser(id);
  }

});

var isSuperUser = function(id) {
  if(id) {
    var user = Meteor.users.findOne({_id: id});
    if(user && user.accountType && user.accountType === 'admin') {
      return true;
    }
  } else {
    if(Meteor.user() && Meteor.user().accountType && Meteor.user().accountType === 'admin') {
      return true;
    }
  }
  return false;
}

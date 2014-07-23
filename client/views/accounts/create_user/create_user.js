 Template.NavBarCreateUserDropdown.events({
  // Submit event on forgotton password
  'submit form': function(event, tmpl) {
    event.preventDefault();

    try {
      var email = tmpl.find("input[type=email]").value;
      Meteor.call('createConceptUser', email, function(error, result) {
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


/**
 * LoginForm: Handles login states like login, forgot password etc.
 */

// -- Events --------------------------------------------------------

Template.LoginForm.events({
  'click #forgot-password': function(event,tmpl){
    Router.go('AdminForgottonPassword');
  },

  'click #cancel': function(event, tmpl){
    Router.go('AdminLogon');
  },

  // Submit event on forgotton password route
  'submit form.form-password-lookup': function(event, tmpl) {
    event.preventDefault();

    try {
      var submitButton = tmpl.find('#submit');
      var email = tmpl.find('#email').value;

      // display loading indicator and disable button
      toggleButtons(submitButton, true);

      // A basic call for a password reset
      Accounts.forgotPassword({email: email}, function(error){
        // create error alert box on error
        if (error) {
          Alert.add({msg: error}, tmpl, '#single-page-login-alert');
        // or redirect to logon page
        } else {
          Router.go('AdminLogon');
        }

        // Enable button and set button text
        toggleButtons(submitButton, false, 'Send inn');
      });
    } catch(error) {
      // if error: create alert box with error message
      Alert.add({msg: error}, tmpl, '#single-page-login-alert');
    }
  },

  // Submit event on Logon route
  'submit form.form-signin': function(event,tmpl) {
    event.preventDefault();

    try {

      var username = tmpl.find('#username').value;
      var password = tmpl.find('#password').value;
      var submitButton = tmpl.find('#submit');

      // sets spinner and disables the button
      toggleButtons(submitButton, true);

      // log into app with username and password
      Meteor.loginWithPassword(username, password, function(error){

        if(error) {
          Alert.add({msg: error}, tmpl, '#single-page-login-alert');
        } else {
          Router.go('ConceptIndex');
        }

        // reset buttons
        toggleButtons(submitButton, false, 'Logg inn');
      });

    // Catch and display error
    } catch(error) {
      Alert.add({msg: error}, tmpl, '#single-page-login-alert');
    }
  }
});

/**
 * Toggles all buttons enabled state and displays spinner on submit button
 */
var toggleButtons = function(btn, disable, label) {

  if (arguments.length > 2 && disable) {
    submitButton.innerHTML = label;
    $('.btn').attr("disabled", disable);
  } else {
    $('.btn').attr("disabled", disable);

    if(!disable) {
      btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    }
  }
}

// -- Alert box helper ------------------------------------------------

Alert = {
  add: function (msg, tmpl, selector) {
    replaceWithTemplate(msg, tmpl, Template.AlertBox, selector);
  }
};

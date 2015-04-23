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
/**
 * LoginForm: Handles login states like login, forgot password etc.
 */

// -- Events --------------------------------------------------------

Template.LoginForm.events({
  'click #forgot-password': function(event,tmpl){
    event.preventDefault();
    Router.go('AdminForgottonPassword');
  },

  'click #cancel': function(event, tmpl){
    event.preventDefault();
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
          Notifications.error(error.title, error);
        // or redirect to logon page
        } else {
          Router.go('AdminLogon');
        }

        // Enable button and set button text
        toggleButtons(submitButton, false, 'Send inn');
      });
    } catch(error) {
      // if error: create alert box with error message
      Notifications.error(error.title, error);
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
          Notifications.error(error.title, error);
        } else {
          Router.go('ConceptIndex');
        }

        // reset buttons
        toggleButtons(submitButton, false, 'Logg inn');
      });

    // Catch and display error
    } catch(error) {
      Notifications.error(error.title, error);
    }
  }
});

/**
 * Toggles all buttons enabled state and displays spinner on submit button
 */
var toggleButtons = function(btn, disable, label) {

  if (arguments.length > 2) {
    btn.innerHTML = label;
    $('.btn').attr("disabled", disable);
  } else {
    $('.btn').attr("disabled", disable);

    if(!disable) {
      btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    }
  }
}

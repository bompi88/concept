// username hack

Template._loginButtonsLoggedInDropdown.helpers({
  displayName: function() {
    return "Brukermeny";
  }
});

Template._loginButtonsAdditionalLoggedInDropdownActions.helpers({
  username: function() {
    return Accounts._loginButtons.displayName();
  }
});

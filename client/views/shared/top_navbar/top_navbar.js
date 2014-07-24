// username hack

Template._loginButtonsLoggedInDropdown.displayName = function() {
  return "Brukermeny";
};

Template._loginButtonsAdditionalLoggedInDropdownActions.username = function() {
  return Accounts._loginButtons.displayName();
}

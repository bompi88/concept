Template.AdminLogon.events({
  'submit form': function(e,t) {
    e.preventDefault();
    try{
      t.find('#submit').innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
      $('.btn').attr("disabled", true);
      Meteor.loginWithPassword(t.find('#username').value, t.find('#password').value, function(error){
        if(error){
          Alert.add(error, t);
        } else {
          Router.go('ConceptIndex');
        }
        t.find('#submit').innerHTML = 'Submit';
        $('.btn').attr("disabled", false);
      });
    } catch(error) {
      Alert.add(error, t);
    }
  },
  'click #forgot-password': function(e,t){
    Router.go('AdminForgottonPassword');
  }
});


var Alert = {
  add: function (msg, t) {
    t.find('#single-page-login-alert').innerHTML = '<div class="alert alert-danger alert-dismissable" id="single-page-login-alert-msg">' + msg +' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>';
  },
};

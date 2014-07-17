Template.ConnectionStatus.helpers({
    status: function() {
      return Meteor.status().status;
    },
    retries: function() {
      return Meteor.status().retryCount;
    }
});

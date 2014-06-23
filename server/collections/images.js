Images.allow({
  insert: function (userId, doc) {
    if(userId) {
      return true;
    } else {
      return false;
    }
  },

  update: function (userId, doc, fieldNames, modifier) {
    if(userId) {
      return true;
    } else {
      return false;
    }
  },

  remove: function (userId, doc) {
    if(userId) {
      return true;
    } else {
      return false;
    }
  },
  
  download: function() {
    return true;
  }
});
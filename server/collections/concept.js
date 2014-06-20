/*
 * Add query methods like this:
 *  Concept.findPublic = function () {
 *    return Concept.find({is_public: true});
 *  }
 */

Reports.allow({
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
  }
});

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
  }
});

Files.allow({
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
  }
});

SeoCollection.allow({
  insert: function(userId, doc) {
    return true;
  }
});
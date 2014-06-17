
Concept = new Meteor.Collection('concept');

Reports = new Meteor.Collection('reports');

Images = new FS.Collection("images", {
    stores: [
      new FS.Store.GridFS("original", {}),
      new FS.Store.GridFS("thumbs", {
        transformWrite: function(fileObj, readStream, writeStream) { 
          // Transform the image into a thumbnail
      		gm(readStream, fileObj.name).resize(null, '200').setFormat("PNG").stream().pipe(writeStream);
        }
      })
    ],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images
      }
    }
  });

Files = new FS.Collection("files", {
    stores: [ new FS.Store.GridFS("files", {})]
});

/*
 * Add query methods like this:
 *  Concept.findPublic = function () {
 *    return Concept.find({is_public: true});
 *  }
 */

/**
 * Images Collection
 */

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("original", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a smaller image,
        // max 1024 pixels in either direction
        gm(readStream, fileObj.name).resize('1024', '1024')
          .setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("medium", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a thumbnail
        gm(readStream, fileObj.name).resize('500', '250')
          .setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("thumbs", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a thumbnail
        gm(readStream, fileObj.name).resize(null, '150').gravity('Center')
          .crop('250', '150').setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("fixed", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a smaller image,
        // max 1024 pixels in either direction
        gm(readStream, fileObj.name).resize('100', '100', "^")
        .gravity('Center')
        .extent('100', '100')
        .setFormat("PNG").stream().pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images
    }
  }
});

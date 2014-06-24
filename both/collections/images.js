/*****************************************************************************/
/* Images Collection */
/*****************************************************************************/

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
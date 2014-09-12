/*****************************************************************************/
/* DownloadListTable: Helpers */
/*****************************************************************************/

Template.DownloadList.helpers({
  getData: function(id, options) {
    var report = this;
    console.log(options.hash.parent)
    if(options.hash && options.hash.parent && options.hash.parent.type) {
      if (options.hash.parent.type === 'images') {
        if(report && report.images){
            var img_data = _.find(report.images, function(img){ return img.fileId == id; });

            return _.extend(this, img_data);
        }
        return null;
      } else if (options.hash.parent.type === 'files') {
        if(report && report.references){
            var ref_data = _.find(report.references, function(ref){ return ref.fileId == id; });

            return _.extend(this, ref_data);
        }
        return null;
      }
    }
    return null;
  },

  // TODO: fix bad code
  // Runs for every image file in list, each time uploadObject changes
  getUrl: function(img, store) {
    uploadObject.dep.depend();

    if (img) {
      if (store) {
        return img.url(store);
      }
      else
        return img.url();
    }
    return null;
  },

  isChoosenasMainResource: function(resource) {
    return uploadObject.getImages().indexOf(resource) === 0;
  }
});

Template.DownloadList.events({
  'click .set-main-img': function (evt, tmpl) {
    uploadObject.setAsMainImg(this.fileId);
  }
});

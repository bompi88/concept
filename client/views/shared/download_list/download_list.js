/*****************************************************************************/
/* DownloadListTable: Helpers */
/*****************************************************************************/

Template.DownloadList.helpers({
  getData: function(id, options) {
    var report = Router.getData();
    if(options.hash && options.hash.parent && options.hash.parent.type) {
      if (options.hash.parent.type === 'images') {
        if(report && report.images){
            var img_data = _.find(report.images, function(img){ return img.fileId == id; });

            return _.extend(this, img_data);
        }
        return this;
      } else if (options.hash.parent.type === 'files') {
        if(report && report.references){
            var ref_data = _.find(report.references, function(ref){ return ref.fileId == id; });

            return _.extend(this, ref_data);
        }
        return this;
      }
    }
    return null;

  },
  getUrl: function(img, store) {
    uploadObject.dep.depend();
    
    if (img) {
      if (store) {
        console.log(store);
        return img.url(store);

      }
      else
        return img.url();
    }
    return null;
  }
});
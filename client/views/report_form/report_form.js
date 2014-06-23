/*****************************************************************************/
/* ReportForm: Data-objects */
/*****************************************************************************/

uploadObject = {
  Images: [],
  References: [],
  dep: new Deps.Dependency,
  getImages: function() {
    this.dep.depend();
    return this.Images;
  },
  getReferences: function() {
    this.dep.depend();
    return this.References;
  },
  addImage: function(fileObj) {

    this.Images.push(fileObj._id);
    this.dep.changed();
    return this.Images;
  },
  addReference: function(fileObj) {

    this.References.push(fileObj._id);
    this.dep.changed();
    return this.References;
  },
  removeImage: function(id) {
    this.Images = removeItem(this.Images, id);

    this.dep.changed();
    return this.Images;
  },
  removeReference: function(id) {
    this.References = removeItem(this.References, id);
    
    this.dep.changed();
    return this.References;
  },
  reset: function() {
    this.Images = [];
    this.References = [];
    this.dep.changed();
  }
}

locationObject = {
  coordinates: {},
  dep: new Deps.Dependency,
  getCoordinates: function() {
    this.dep.depend();
    
    return this.coordinates;
  },
  setCoordinates: function(c) {
    this.coordinates = c;
    this.dep.changed();  
    return this.coordinates;
  }
}

/*****************************************************************************/
/* ReportForm: Event handlers */
/*****************************************************************************/

Template.ReportForm.events({
  'click .delete-btn': function(event, tmpl) {
    Meteor.call('deleteReport', this._id, function (error, result) {
      Router.go(Router.path('ReportList'));
    });
  },
  'click .cancel-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  },
  'change #dropzone-images': function(event, tmpl) {
    uploadImages(event);
  },
  'click #dropzone-images': function(event, tmpl) {
    document.getElementById('upload-images').click();
  },
  'drop #dropzone-images': function(event, tmpl) {
    uploadImages(event);
  },
  'change #dropzone-files': function(event, tmpl) {
    uploadFiles(event);
  },
  'click #dropzone-files': function(event, tmpl) {
    document.getElementById('upload-files').click();
  },
  'drop #dropzone-files': function(event, tmpl) {
    uploadFiles(event);
  }
});

/*****************************************************************************/
/* ReportForm: Helpers */
/*****************************************************************************/

Template.ReportForm.helpers({
  imagesList: function() {
    if(currentRouteIs('EditReport')) {
      var report = Router.getData();

      if(report) {
        var new_img_ids = uploadObject.getImages();
        var old_img_ids = _.pluck(report.images, 'fileId');

      return Images.find({_id: {$in : new_img_ids.concat(old_img_ids)}});
      }
      return [];
    }
    return Images.find({_id: {$in : uploadObject.getImages()}});
  },
  referencesList: function() {
    if(currentRouteIs('EditReport')) {
      var report = Router.getData();

      if(report) {
        var new_files_ids = uploadObject.getReferences();
        var old_files_ids = _.pluck(report.references, 'fileId');

        return Files.find({_id: {$in : new_files_ids.concat(old_files_ids)}});
      }
      return [];
    }
    return Files.find({_id: {$in : uploadObject.getReferences()}});
  }
});

/*****************************************************************************/
/* ReportForm: Lifecycle hooks */
/*****************************************************************************/

Template.ReportForm.rendered = function () {
  uploadObject.reset();
  var report = Router.getData();
  if(report) {
    if(report.images) {
      for(var i = 0; i < report.images.length; i++) {
        uploadObject.addImage({_id:report.images[i].fileId});
      }
    }
    if(report.references) {
      for(var i = 0; i < report.references.length; i++) {
        uploadObject.addReference({_id:report.references[i].fileId});
      }
    }
  }
};
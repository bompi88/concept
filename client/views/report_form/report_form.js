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

    Meteor.subscribe('image', fileObj._id);

    this.Images.push(fileObj._id);
    this.dep.changed();
    return this.Images;
  },
  addReference: function(fileObj) {

    Meteor.subscribe('file', fileObj._id);

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
  setAsMainImg: function(id) {

    this.Images = _.reject(this.Images, function(fileId) {
      return fileId === id;
    });

    this.Images.splice(0, 0, id);

    this.dep.changed();
    return this.Images;
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
      Router.go(Router.path('Reports', {page: 0}));
    });
  },

  'keydown #map-canvas':function(event, tmpl) {
    if (event.which === 13) {
      event.preventDefault();
    }
  },

  'click .cancel-btn': function(event, tmpl) {
    if(this._id) {
      Router.go('Report', {_id: this._id, slug: slugify(this.project.name)});
    } else {
      Router.go('ReportsIndex');
    }
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

      var report = this.doc;
      console.log(report)
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
      var report =  this.doc;

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

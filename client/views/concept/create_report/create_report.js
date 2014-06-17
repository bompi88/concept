/*****************************************************************************/
/* CreateReport: Data-objects */
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
    this.dep.changed();  //invalidates all dependent computations
    return this.Images;
  },
  addReference: function(fileObj) {

    this.References.push(fileObj._id);
    this.dep.changed();  //invalidates all dependent computations
    return this.References;
  },
  removeImage: function(id) {
    this.Images = removeByFileId(this.Images, id);

    this.dep.changed();  //invalidates all dependent computations
    return this.Images;
  },
  removeReference: function(id) {
    this.References = removeByFileId(this.References, id);
    
    this.dep.changed();  //invalidates all dependent computations
    return this.References;
  },
  reset: function() {
    this.Images = [];
    this.References = [];
    this.dep.changed();
  }
}

var locationObject = {
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

var removeByFileId = function(array, id) {
    return _.reject(array, function(item) {
        return item === id; // or some complex logic
    });
};

/*****************************************************************************/
/* CreateReport: Event Handlers and Helpers */
/*****************************************************************************/

Template.CreateReport.events({
  'submit #report-form': function (event, tmpl) {
    event.preventDefault();

    // our report document
    var report = {
      project: {},
      evaluation: {}
    };

    // get all variables, and build the document
    report.project.name = tmpl.find('#name').value;
    report.project.projectNumber = tmpl.find('#project-num').value;
    report.project.sector = tmpl.find('#sector').value;

    report.project.location = {};

    report.project.location.name = tmpl.find('#location').value;
    report.project.location.coordinates = locationObject.getCoordinates();
    
    report.project.successCategory = tmpl.find('input[name="traffic-light"]:checked').value;
    
    report.project.projectDescription = {};
    report.project.projectDescription.short = tmpl.find('#project-desc-short').value;
    report.project.projectDescription.long = tmpl.find('#project-desc-long').value;

    report.project.finishingYear = tmpl.find('#finishing-year').value;
    report.project.evaluationYear = tmpl.find('#eval-year').value;
    report.project.decisionYear = tmpl.find('#decision-year').value;

    report.project.managementBudget = {};
    report.project.costBudget = {};
    report.project.costFinal = {};

    report.project.managementBudget.year = tmpl.find('#decision-year').value;
    report.project.costBudget.year = tmpl.find('#decision-year').value;
    report.project.costFinal.year = tmpl.find('#finishing-year').value;

    report.project.managementBudget.amount = tmpl.find('#management-budget').value;
    report.project.costBudget.amount = tmpl.find('#cost-budget').value;
    report.project.costFinal.amount = tmpl.find('#cost-final').value;

    report.responsible = {};
    report.responsible.organization = tmpl.find('#eval-responsible-org').value;
    report.responsible.person = tmpl.find('#eval-responsible-person').value;
    report.principal = tmpl.find('#principal').value;

    report.evaluation.productivity = {};
    report.evaluation.achievement = {};
    report.evaluation.effects = {};
    report.evaluation.relevance = {};
    report.evaluation.viability = {};
    report.evaluation.profitability = {};

    report.evaluation.productivity.short = tmpl.find('#eval-productivity-short').value;
    report.evaluation.productivity.long = tmpl.find('#eval-productivity-long').value;
    report.evaluation.achievement.short = tmpl.find('#eval-achievement-short').value;
    report.evaluation.achievement.long = tmpl.find('#eval-achievement-long').value;

    report.evaluation.effects.short = tmpl.find('#eval-effects-short').value;
    report.evaluation.effects.long = tmpl.find('#eval-effects-long').value;

    report.evaluation.relevance.short = tmpl.find('#eval-relevance-short').value;
    report.evaluation.relevance.long = tmpl.find('#eval-relevance-long').value;

    report.evaluation.viability.short = tmpl.find('#eval-viability-short').value;
    report.evaluation.viability.long = tmpl.find('#eval-viability-long').value;

    report.evaluation.profitability.short = tmpl.find('#eval-profitability-short').value;
    report.evaluation.profitability.long = tmpl.find('#eval-profitability-long').value;

    report.evaluation.productivity.value = tmpl.find('input[name="num-eval-productivity"]:checked').value;
    report.evaluation.achievement.value = tmpl.find('input[name="num-eval-achievement"]:checked').value;
    report.evaluation.effects.value = tmpl.find('input[name="num-eval-effects"]:checked').value;
    report.evaluation.relevance.value = tmpl.find('input[name="num-eval-relevance"]:checked').value;
    report.evaluation.viability.value = tmpl.find('input[name="num-eval-viability"]:checked').value;
    report.evaluation.profitability.value = tmpl.find('input[name="num-eval-profitability"]:checked').value;

    var imgs_ids = uploadObject.getImages();
    var imgs = [];

    for (var i = 0; i < imgs_ids.length; i++){
      var img = {
        fileId: imgs_ids[i],
        title: tmpl.find('#title-' + imgs_ids[i]).value,
        copyright: tmpl.find('#copyright-' + imgs_ids[i]).value,
        link: tmpl.find('#link-' + imgs_ids[i]).value
      };
      imgs.push(img);
    }
    report.images = imgs;

    var files_ids = uploadObject.getReferences();
    var files = [];

    for (var i = 0; i < files_ids.length; i++){
      var file = {
        fileId: files_ids[i],
        title: tmpl.find('#title-' + files_ids[i]).value,
        typedoc: tmpl.find('#typedoc-' + files_ids[i]).value,
        date: tmpl.find('#date-' + files_ids[i]).value
      };
      files.push(file);
    }
    report.references = files;
    console.log(report)
    // call server side method to insert the document into the database
    if(currRoute('EditReport')) {
      Meteor.call('updateReport', this._id, report);
    } else {
      Meteor.call('insertReport', report);
    }
  
    // redirect to report list (for now)
    Router.go(Router.path('ReportList'));
  },
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

var uploadImages = function(event) {
  FS.Utility.eachFile(event, function(image) {
    Images.insert(image, function (err, fileObj) {
      if(fileObj)
        uploadObject.addImage(fileObj);

    });
  });
};

var uploadFiles = function(event) {
  FS.Utility.eachFile(event, function(file) {
    Files.insert(file, function (err, fileObj) {
      if(fileObj)
        uploadObject.addReference(fileObj);
    });
  });
};
var currRoute = function(route) {
    var currentRoute = Router.current();
    if (!currentRoute) return '';

    return route === currentRoute.route.name ? true : false;
  };


Template.CreateReport.helpers({
  imagesList: function() {
    if(currRoute('EditReport')) {
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
    if(currRoute('EditReport')) {
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

UI.registerHelper('$generateId', function (name, _id, options) {
 return _.extend(options.hash, { id: name + '-' + _id});
});

UI.registerHelper('$isNotEmptyArray', function (array) {
  if (!array || !array.count)
    return false;
 return array.count() > 0;
});

/*****************************************************************************/
/* CreateReport: Lifecycle Hooks */
/*****************************************************************************/
Template.MapLocationPicker.rendered = function () {

  L.Icon.Default.imagePath = '/packages/leaflet/images';
  // create a map in the "map" div, set the view to Trondheim and zoom to get most of Norway
  var map = L.map('map', {doubleClickZoom: false}).setView([63.43, 10.39], 5);


  map.addControl( new L.Control.Search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon']
  }) );



  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var locationAdded = false;

  map.on('dblclick', function(e) {

    if(!locationAdded) {
      var marker = L.marker(e.latlng).addTo(map)
        .on('click', function(event) {
          if(locationAdded) {
            map.removeLayer(marker);
            locationAdded = false;
          }

        });
      locationObject.setCoordinates(e.latlng);
      locationAdded = true;
    }

  });

  Deps.autorun(function () {
    var report = Router.getData();
    if(report && report.project && report.project.location && report.project.location.coordinates && report.project.location.coordinates.lat) {
      var coords = report.project.location.coordinates;
      locationObject.setCoordinates(coords);  
      locationAdded = true

      var marker = L.marker([coords.lat, coords.lng]).addTo(map).on('click', function(event) {
        if(locationAdded) {
          map.removeLayer(marker);
          locationAdded = false;
        }

      });;
    }
  });
};

Template.DownloadListTable.helpers({
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
  }
});

Template.CreateReport.created = function () {
};

Template.CreateReport.rendered = function () {
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

Template.CreateReport.destroyed = function () {
};
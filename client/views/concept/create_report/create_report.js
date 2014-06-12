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

    this.Images.push(fileObj);
    this.dep.changed();  //invalidates all dependent computations
    return this.Images;
  },
  addReference: function(fileObj) {

    this.References.push(fileObj);
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
  }
}

var removeByFileId = function(array, id) {
    return _.reject(array, function(item) {
        return item._id === id; // or some complex logic
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
    report.project.location = tmpl.find('#location').value;
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

    report.evaluation.textual = {
      productivity: {},
      achievement: {},
      effects: {},
      relevance: {},
      viability: {},
      profitability: {}
    };

    report.evaluation.textual.productivity.short = tmpl.find('#eval-productivity-short').value;
    report.evaluation.textual.productivity.long = tmpl.find('#eval-productivity-long').value;
    report.evaluation.textual.achievement.short = tmpl.find('#eval-achievement-short').value;
    report.evaluation.textual.achievement.long = tmpl.find('#eval-achievement-long').value;

    report.evaluation.textual.effects.short = tmpl.find('#eval-effects-short').value;
    report.evaluation.textual.effects.long = tmpl.find('#eval-effects-long').value;

    report.evaluation.textual.relevance.short = tmpl.find('#eval-relevance-short').value;
    report.evaluation.textual.relevance.long = tmpl.find('#eval-relevance-long').value;

    report.evaluation.textual.viability.short = tmpl.find('#eval-viability-short').value;
    report.evaluation.textual.viability.long = tmpl.find('#eval-viability-long').value;

    report.evaluation.textual.profitability.short = tmpl.find('#eval-profitability-short').value;
    report.evaluation.textual.profitability.long = tmpl.find('#eval-profitability-long').value;

    report.evaluation.numeric = {
      productivity: { axis: "Produktivitet" },
      achievement: { axis: "Måloppnåelse" },
      effects: { axis: "Virkninger" },
      relevance: { axis: "Relevans" },
      viability: { axis: "Levedyktighet" },
      profitability: { axis: "Samf.øk. lønnsomhet" }
    };

    report.evaluation.numeric.productivity.value = tmpl.find('input[name="num-eval-productivity"]:checked').value;
    report.evaluation.numeric.achievement.value = tmpl.find('input[name="num-eval-achievement"]:checked').value;
    report.evaluation.numeric.effects.value = tmpl.find('input[name="num-eval-effects"]:checked').value;
    report.evaluation.numeric.relevance.value = tmpl.find('input[name="num-eval-relevance"]:checked').value;
    report.evaluation.numeric.viability.value = tmpl.find('input[name="num-eval-viability"]:checked').value;
    report.evaluation.numeric.profitability.value = tmpl.find('input[name="num-eval-profitability"]:checked').value;

    // call server side method to insert the document into the database
    Meteor.call('insertReport', report);

    // redirect to report list (for now)
    Router.go(Router.path('AdminReportList'));
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
      uploadObject.addReference(fileObj);
    });
  });
};

Template.CreateReport.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
  references: function() {
    return uploadObject.getReferences();
  },
  images: function() {
    return uploadObject.getImages();
  }
});

/*****************************************************************************/
/* CreateReport: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateReport.created = function () {
};

Template.CreateReport.rendered = function () {
};

Template.CreateReport.destroyed = function () {
};
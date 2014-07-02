Template.ProjectReferences.helpers({
  getFileURL: function(fileId) {
    var file = Files.findOne({_id:fileId});
    
    if (file) {
      return file.url();
    }
    else
      return false;
  }
});
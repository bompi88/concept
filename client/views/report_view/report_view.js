Session.setDefault('TextState','short');

/*****************************************************************************/
/* ReportView: Event Handlers */
/*****************************************************************************/

Template.ReportView.events({
  'click #text-view-short': function(event, tmpl) {
    Session.set('TextState', 'short');
  },

  'click #text-view-long': function(event, tmpl) {
    Session.set('TextState', 'long');
  },

  'click #export-text': function(event, tmpl) {
    window.open('/generate-pdf/' + this._id);
  },

  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  }
});

/*****************************************************************************/
/* ReportView: Helpers */
/*****************************************************************************/

Template.ReportView.helpers({
  textState: function () {
    return Session.get('TextState');
  }
});

window.downloadFile = function(sUrl) {
 
    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
 
        if (link.download !== undefined){
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
 
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click' ,true ,true);
            link.dispatchEvent(e);
            return true;
        }
    }
 
    window.open(sUrl);
}
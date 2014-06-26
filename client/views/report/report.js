Session.setDefault('TextState','short');

/*****************************************************************************/
/* ReportView: Event Handlers */
/*****************************************************************************/

Template.Report.events({
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

Template.Report.helpers({
  textState: function () {
    return Session.get('TextState');
  },
  getFileURL: function(fileId) {
    var file = Files.findOne({_id:fileId});
    
    if (file) {
      return file.url();
    }
    else
      return false;
  },
     getMainImageUrl: function() {
    if(this.images && this.images[0]) {
      var original = Images.findOne({_id:this.images[0].fileId});

      if (original) {
        return original.url();
      }
      else
        return false;
    }
    return false;
   },
   getImageUrl: function(fileId) {
      var image = Images.findOne({_id:fileId});
      if(image)
        return image.url();
      else
        return false;
   },
   getThumbUrl: function(fileId) {   
      var image = Images.findOne({_id:fileId});
      if(image)
        return image.url({store:'thumbs'});
      else
        return false;
   }
});


Template.Report.rendered = function() {


  Deps.autorun(function () {

    var report = Router.getData();
 
    if (report) {
      var values = _.pluck(report.evaluation, 'value');
      
      var data = {
        labels : ["Produktivitet", "Måloppnåelse", "Virkninger", "Relevans", "Levedyktighet", "Samf.øk. lønnsomhet"],
        datasets : [
          {
            fillColor : "rgba(0, 140, 186, 0.3)",
            strokeColor : "rgba(0, 140, 186, 0.9)",
            pointColor : "rgba(0, 140, 186, 0.9)",
            pointStrokeColor : "rgba(0, 140, 186, 1)",
            data : values
          }
        ]
      }
      var options = {
        //Boolean - Whether to show labels on the scale 
        scaleShowLabels : true,
        //Number - Scale label font size in pixels  
        scaleFontSize : 22,
        //Boolean - If we show the scale above the chart data     
        //scaleOverlay : true,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 6,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 1,
        //Number - The centre starting value
        scaleStartValue : 0,
        //Number - Point label font size in pixels  
        pointLabelFontSize : 24,
        //String - Point label font colour  
        pointLabelFontColor : "rgba(0,0,0,0.8)",
        //String - Colour of the scale line 
        scaleLineColor : "rgba(0,0,0,.4)",
        //String - Scale label font colour  
        scaleFontColor : "rgba(0,0,0,0.5)",
        //String - Point label font weight
        pointLabelFontStyle : "normal"
      }
      var el = $("#spiderEvaluation");

      if (el.get(0)) {
        var ctx = el.get(0).getContext("2d");
        var chart = new Chart(ctx).Radar(data, options);
      }
    }
  });

  $('body').scrollspy({ target: '#sidebar'});

          // figure out a nice offset from the top of the page
        var scrollTopOffset = 55; // + 50;
        // catch clicks on sidebar navigation links and handle them
        $('#sidebar li a').on('click', function(evt){
            // stop the default browser behaviour for the click 
            // on the sidebar navigation link
            evt.preventDefault();
            // get a handle on the target element of the clicked link
            var $target = $($(this).attr('href'));
            // manually scroll the window vertically to the correct
            // offset to nicely display the target element at the top
            $(window).scrollTop($target.offset().top-(scrollTopOffset));
        }); 


}


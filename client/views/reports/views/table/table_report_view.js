Template.TableReportView.events({
  'click .row-item': function(event, tmpl) {
    Router.go(Router.path('Report', {_id: this._id}));
  },
  'click .checkbox': function(event, tmpl) {
    var that = this;

    //unchecked fører til at vi må svarteliste rapporten globalt
    if($(event.currentTarget).prop("checked") === false) {
      var blacklist = Session.get('uncheckedReportIds');
      blacklist.push(that._id);
      Session.set('uncheckedReportIds', blacklist);
    }

    //hvis ikke må vi fjerne rapporten fra svartelisten
    else{
     var result = _.reject(Session.get('uncheckedReportIds'), function(id) {

      if(id === that._id)
        return true;
      return false;
    });
     Session.set('uncheckedReportIds', result);
   }
 }
});

Template.TableReportView.isChecked = function() {
  var blacklist = Session.get('uncheckedReportIds');
  if(!_.contains(blacklist, this._id))
    return true;
  return false;
}

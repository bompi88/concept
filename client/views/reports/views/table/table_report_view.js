Template.TableReportView.events({
  'click .row-item': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  },
  'click .checkbox': function(event, tmpl) {
    var that = this;

    //unchecked fører til at vi må svarteliste rapporten globalt
    if($(event.target).prop("checked") == false) {
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


Template.TableReportView.reports = function() {
  var q = Session.get('query');
  var s = {sort: {}};
  s.sort[Session.get('sortBy')] = Session.get('sortOrder') == 'asc' ? 1 : -1;
  var reportList = Reports.find(q, s);
  return reportList;
};

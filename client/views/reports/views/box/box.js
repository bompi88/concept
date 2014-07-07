Template.BoxReportView.reports = function() {
  var q = Session.get('query');
  var s = {sort: {}};
  s.sort[Session.get('sortBy')] = Session.get('sortOrder') == 'asc' ? 1 : -1;
  var reportList = Reports.find(q, s);
  return reportList;
};

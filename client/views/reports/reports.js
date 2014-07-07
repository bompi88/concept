

Session.setDefault('ReportViewState','box');
Session.setDefault('sortBy', 'project.name');
Session.setDefault('sortOrder', 'asc');
Session.setDefault('sortType', 'string');
Session.setDefault('showFilter', false);
Session.setDefault('filters', []);
Session.setDefault('query', {})
Session.setDefault('uncheckedReportIds', []);


/*****************************************************************************/
/* Reports: Event Handlers and Helpers */
/*****************************************************************************/




Template.Reports.events({
  'click #report-view-option1': function(event, tmpl) {
    Session.set('ReportViewState', 'box');
  },
  'click #report-view-option2': function(event, tmpl) {
    Session.set('ReportViewState', 'table');
  },
  'click #report-view-option3': function(event, tmpl) {
    Session.set('ReportViewState', 'map');
  },
  'click #report-view-option4': function(event, tmpl) {
    Session.set('ReportViewState', 'timeline');
  },
  'click .sort-toggle': function(event, tmpl) {
    var t = $(event.currentTarget).attr("data-id");

    if (t === 'name') {
      orderBy('project.name', undefined, 'string');
    } else if (t === 'success') {
      orderBy('project.successCategory', -1, 'number');
    } else if (t === 'sector') {
      orderBy('project.sector', undefined, 'string');
    } else if (t === 'finishing-year') {
      orderBy('project.finishingYear', undefined, 'number');
    } else if (t === 'evaluation-year') {
      orderBy('project.evaluationYear', undefined, 'number');
    } else if (t === 'management-budget') {
      orderBy('project.managementBudget.amount', undefined, 'number');
    } else if (t === 'cost-final') {
      orderBy('project.costFinal.amount', undefined, 'number');
    } else if (t === 'responsible-org') {
      orderBy('responsible.organization', undefined, 'string');
    }
  },
  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  },
  'click #btn-filter' : function(event, tmpl) {
    //lose focus on the clicked element
    event.currentTarget.blur();
    var state = Session.get('showFilter');
    if(state)
      Session.set('showFilter', false);
    else
      Session.set('showFilter', true);
  },
  //handles csv export
  'click #download' : function(event, tmpl) {
    var reportids = "?reports=";
    var i;
    var q = Session.get('query');
    var s = {sort: {}};
    s.sort[Session.get('sortBy')] = Session.get('sortOrder') == 'asc' ? 1 : -1;
    var reports = Reports.find(q, s).fetch();

    //append report id from all filtered reports
    for(i = 0; i < reports.length; i++) {

      var r = reports[i];

      if(! _.contains(Session.get('uncheckedReportIds'), r._id)) {
        if(i === reports.length - 1)
          reportids += r._id;
        else
          reportids += r._id + ',';
      }
    }
    //send all ids to csv route for export
    var w = window.open('/csv/' + reportids);
    setTimeout(function() {
      w.close();
    }, 2000);
  }
});


Template.Reports.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  },
  showSortBox: function() {
    var listState = Session.get('ReportViewState');

    return listState === 'box' || listState === 'table';
  }
});


var orderBy = function(attr, asc, type) {
  Session.set('sortType', type);
  if(Session.get('sortBy') === attr) {
    reverseOrder();
  }
  else {
    Session.set('sortBy', attr);
    if(asc == -1) {
      Session.set('sortOrder', 'desc');
    } else {
      Session.set('sortOrder', 'asc');
    }
  }
};

var reverseOrder = function() {
  if(Session.get('sortOrder') === 'asc') {
    Session.set('sortOrder', 'desc');
  } else {
    Session.set('sortOrder', 'asc');
  }
}

Session.setDefault('ReportViewState','box');
Session.setDefault('sortBy', 'project.name');
Session.setDefault('sortOrder', 'asc');

/*****************************************************************************/
/* ReportList: Event Handlers and Helpers */
/*****************************************************************************/



Template.Toolbar.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  }
});

Template.SortBox.helpers({
  currentSort: function() {
    var text = '';
    var curSort = Session.get('sortBy');

    if (curSort === 'project.name') {
      text = 'Navn';
    } else if (curSort === 'project.successCategory') {
      text = 'Suksesskategori';
    } else if (curSort === 'project.sector') {
      text = 'Sektor';
    } else if (curSort === 'project.finishingYear') {
      text = 'Årstall ferdigstilt';
    } else if (curSort === 'project.evaluationYear') {
      text = 'Årstall evaluering';
    } else if (curSort === 'project.managementBudget.amount') {
      text = 'Styringsramme';
    } else if (curSort === 'project.costFinal.amount') {
      text = 'Sluttkostnad';
    } else if (curSort === 'responsible.organization') {
      text = 'Ansvarlig';
    }
    return text;
  },
  currentSortDirection: function() {
    return Session.get('sortOrder') === 'asc' ? 'stigende' : 'synkende';
  }

});

Template.ReportList.events({
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
      orderBy('project.name');
    } else if (t === 'success') {
      orderBy('project.successCategory', -1);
    } else if (t === 'sector') {
      orderBy('project.sector');
    } else if (t === 'finishing-year') {
      orderBy('project.finishingYear');
    } else if (t === 'evaluation-year') {
      orderBy('project.evaluationYear');
    } else if (t === 'management-budget') {
      orderBy('project.managementBudget.amount');
    } else if (t === 'cost-final') {
      orderBy('project.costFinal.amount');
    } else if (t === 'responsible-org') {
      orderBy('responsible.organization');
    }
  },
  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  }
});


Template.ReportList.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  },
  showSortBox: function() {
    var listState = Session.get('ReportViewState');

    return listState === 'box' || listState === 'table';
  }
});

Template.TableReportView.helpers({
  reports: function() {
    return getReports();
  }
});

Template.TableReportView.events({
  'click .table-row': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  }
});

Template.BoxReportView.helpers({
  reports: function() {
    return getReports();
  }
});

var orderBy = function(attr, asc) {
  if(Session.get('sortBy') === attr) {
    reverseOrder();
  } else {
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

var getReports = function() {

  var reportList = Reports.find({}).fetch();

  reportList.sort(sortFunc);

  if (Session.get('sortOrder') === 'desc')
    reportList.reverse();

  return reportList;
}

var sortFunc = function(a, b) {
  var sortBy = Session.get('sortBy');
  var as = Object.byString(a, sortBy), bs = Object.byString(b, sortBy);

  if(isString(as) && isString(bs)) {
    var x = as.toLowerCase(), y = bs.toLowerCase();

    return x.localeCompare(y);
  } else if(isNumber(as) || isNumber(bs)) {
     return as - bs;
  } else {
    return as - bs;
  }
}

var toString = Object.prototype.toString;

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

var isString = function (obj) {
  return  Object.prototype.toString.call(obj) === '[object String]';
}

Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      return;
    }
  }
  return o;
}

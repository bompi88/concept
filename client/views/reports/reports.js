

Session.setDefault('ReportViewState','box');
Session.setDefault('sortBy', 'project.name');
Session.setDefault('sortOrder', 'asc');
Session.setDefault('sortType', 'string');
Session.setDefault('showFilter', false);
Session.setDefault('filters', []);
Session.setDefault('query', {})
Session.setDefault('uncheckedReportIds', []);
Session.setDefault('currentPage', 1);


/*****************************************************************************/
/* Reports: Event Handlers and Helpers */
/*****************************************************************************/

Template.Reports.rendered = function() {
  Session.set('uncheckedReportIds', []);
};

Template.Reports.csvLink = function() {
  //handles csv export
  var reportids = "?reports=" + Session.get('uncheckedReportIds').join();
  var query = "&query=" + JSON.stringify(Session.get('query'));
  var s = {sort: {}};
  s.sort[Session.get('sortBy')] = Session.get('sortOrder') == 'asc' ? 1 : -1;
  var sort = "&sort=" + JSON.stringify(s);
  return '/csv/' + reportids + query + sort;
};

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
    } else if (t === 'cost-budget') {
      orderBy('project.costBudget.amount', undefined, 'number');
    } else if (t === 'responsible-org') {
      orderBy('responsible.organization', undefined, 'string');
    }
  },
  'click .edit-btn': function(event, tmpl) {
    Router.go('/report/' + this._id + '/edit');
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
  'click #download' : function(event, tmpl) {
    event.stopPropagation();
  },
  'click .paging': function(event, tmpl) {
    event.currentTarget.blur();
    var newPage = parseInt(tmpl.find(event.target).textContent);
    Session.set('currentPage', newPage);
    Router.go('/reports/' + (newPage - 1));
  },
  'click #next-page': function(event) {
    var page = Session.get('currentPage');
    if(page + 1 <= Session.get('numberOfPages')) {
      Session.set('currentPage', page + 1);
      Router.go('/reports/' + page);
    }
  },
  'click #last-page': function(event) {
    var page = Session.get('currentPage');
    if(page - 1 >= 1) {
      Session.set('currentPage', page - 1);
      Router.go('/reports/' + (page - 2));
    }
  }
});

Template.Reports.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  },
  showSortBox: function() {
    var listState = Session.get('ReportViewState');

    return listState === 'box' || listState === 'table';
  },
  pages: function() {
    var pages = [];
    Meteor.call('totalCount', Session.get('query'), function(err, numberOfReports) {
      Session.set('reportCount', numberOfReports);
    });

    var numberOfReports = Session.get('reportCount');
    var numberOfPages = Math.ceil(numberOfReports/20);
    Session.set('numberOfPages', numberOfPages);
    for(var i = 0; i < numberOfPages; i++) {
      var page = {number: i+1};
      if(i == 0)
        page.active = 'active';
      pages.push(page);

    }

    return pages;

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

Session.setDefault('ReportViewState','box');
Session.setDefault('sortBy', 'project.name');
Session.setDefault('sortOrder', 'asc');

/*****************************************************************************/
/* ReportList: Event Handlers and Helpers */
/*****************************************************************************/
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

    if (t === 'project-number') {
      orderBy('project.projectNumber');
    } else if (t === 'name') {
      orderBy('project.name');
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
    } else if (t === 'principal') {
      orderBy('principal');
    }
  }
});

Template.ReportList.helpers({
  viewState: function () {
    return Session.get('ReportViewState');
  },
  currentSort: function() {
    var text = '';
    var curSort = Session.get('sortBy');
    
    if (curSort === 'project.projectNumber') {
      text = 'Prosjektnummer';
    } else if (curSort === 'project.name') {
      text = 'Navn';
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
    } else if (curSort === 'principal') {
      text = 'Oppdragsgiver';
    }

    return text;
  },
  currentSortDirection: function() {
    return Session.get('sortOrder') === 'asc' ? 'stigende' : 'synkende';
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

var orderBy = function(attr) {
  if(Session.get('sortBy') === attr) {
    reverseOrder();
  } else {
    Session.set('sortBy', attr);
    Session.set('sortOrder', 'asc');
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

  reportList.sort(sortString);
  
  if (Session.get('sortOrder') === 'desc')
    reportList.reverse();

  return reportList;
}

var sortString = function(a, b) {
  var sortBy = Session.get('sortBy');
  var x = Object.byString(a, sortBy).toLowerCase(), y = Object.byString(b, sortBy).toLowerCase();

  return x.localeCompare(y);
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

/*****************************************************************************/
/* ReportList: Lifecycle Hooks */
/*****************************************************************************/
Template.TimelineReportView.created = function () {

};

Template.MapReportView.rendered = function () {
// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([51.505, -0.09], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    .openPopup();
}

Template.TimelineReportView.rendered = function () {
  var timeline_config = {
    type: 'timeline',
    width: "100%",
    height: "400",
    source: '/data.json',
    embed_id: 'timeline-embed',
    start_at_end: true,
    lang: 'no'
  }
  Deps.autorun(function() {
      createStoryJS(timeline_config);
  });
};

Template.TimelineReportView.destroyed = function () {

};

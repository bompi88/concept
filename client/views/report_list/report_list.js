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
  },
  'click .edit-btn': function(event, tmpl) {
    Router.go('/reports/' + this._id + '/edit');
  }
});

Template.MapPopupBox.events({
  'click .panel': function(event, tmpl) {
    var id = tmpl.find('.id').value;
    Router.go('/reports/' + id);
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

Template.TimelineReportView.rendered = function () {

  Deps.autorun(function() {
  
    var reports = Reports.find({}).fetch();
    
    if (reports) {
      var elements = [];
      elements = _.map(reports, function(report){

      var reportRoute = Router.routes['ReportView'].path({_id: report._id});

      var res = {
        "startDate":report.project.decisionYear.toString(),
        "endDate":report.project.finishingYear.toString(),
        "headline":"<a href=\""+reportRoute+"\">" + report.project.name +"</a>",
        "text":"<p>" + report.project.projectDescription.short + " " + "<a href=\""+reportRoute+"\">" + "Les mer" +"</a>" + "</p>",

      };

      if (report.images && report.images[0]) {
        var image = Images.findOne({_id:report.images[0].fileId});
        var img_url;
        
        if(image)
          img_url = image.url();
        else
          img_url = "";

        res["asset"] = {
          "media": img_url,
          "credit": "<a href=\""+report.images[0].link+"\">" + report.images[0].copyright +"</a>",
          "caption":report.images[0].title
        }
      }
      return res;
    });
      
      var data = {};

      if (elements) {
        data = {
          "timeline":
          {
              "headline":"Concept-rapporter",
              "type":"default",
              "text":"Evalueringsrapporter av statlige prosjekter.",
              "date": elements
          }
        } 

        var timeline_config = {
          type: 'timeline',
          width: "96%",
          height: "550",
          source: data,
          embed_id: 'timeline-embed',
          start_at_end: true,
          language: VMM.Language.no,
          debug:false
        }

        storyjs_embedjs = new VMM.Timeline('timeline-embed', '100%', '550');
        VMM.debug = false;
        if(storyjs_embedjs && timeline_config.source.timeline.date && timeline_config.source.timeline.date[0])
          storyjs_embedjs.init(timeline_config);
      }
    }
  });
};

VMM.Language.no = {
  lang:"no",
  api:{
    wikipedia:"no"
  },
  date:{
    month:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],
    month_abbr:["Jan.","Feb.","Mars","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Des."],
    day:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],
    day_abbr:["Søn.","Man.","Tir.","Ons.","Tor.","Fre.","Lør."]
  },
  dateformats:{
    year:"yyyy",
    month_short:"mmm",
    month:"mmmm yyyy",
    full_short:"d. mmm",
    full:"d. mmmm',' yyyy",
    time_no_seconds_short:"HH:MM",
    time_no_seconds_small_date:"HH:MM'<br/><small>'d. mmmm',' yyyy'</small>'",
    full_long:"dddd',' d. mmm',' yyyy 'kl.' HH:MM",
    full_long_small_date:"HH:MM'<br/><small>'dddd',' d. mmm',' yyyy'</small>'"
  },
  messages:{
    loading_timeline:"Laster tidslinje... ",
    return_to_title:"Tilbake til tittel",
    expand_timeline:"Utvid tidslinje",
    contract_timeline:"Krymp tidslinje",
    wikipedia:"Fra Wikipedia, den frie encyklopedi",
    loading_content:"Laster innhold",
    loading:"Laster"
  }
};

Template.TimelineReportView.destroyed = function () {
};

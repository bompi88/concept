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
  L.Icon.Default.imagePath = 'packages/leaflet/images';
  // create a map in the "map" div, set the view to Trondheim and zoom to get most of Norway
  var map = L.map('map', {doubleClickZoom: false}).setView([63.43, 10.39], 5);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // add a marker in the given location, attach some popup content to it 
  var reports = Reports.find({});
  reports.forEach(function (report) {

    var toHTMLWithData = function (kind, data) {
      return UI.toHTML(kind.extend({data: function () { return data; }}));
    };

      var mapDiv =  L.DomUtil.create("div","lbqs");
       UI.insert(UI.renderWithData(Template.MapPopupBox,report), mapDiv);




  var marker = L.marker([63.43, 10.39]).bindLabel(report.project.name, {noHide: true}).addTo(map);
   marker.bindPopup(mapDiv);

  //var content = toHTMLWithData(Template.BasicBox, report);
  //console.log(content);

  //div = L.DomUtil.create("div","lbqs");
  //div.appendChild(content);

  //marker.bindPopup(content).openPopup()




  });
}

Template.TimelineReportView.rendered = function () {

  Deps.autorun(function() {
  
    var reports = Reports.find({}).fetch();
    
    if (reports) {
      var elements = [];
      elements = _.map(reports, function(report){

        var res = {
          "startDate":report.project.decisionYear,
          "endDate":report.project.finishingYear,
          "headline":report.project.name,
          "text":"<p>" + report.project.projectDescription.short + "</p>",
        };

        if (report.images && report.images[0]) {
          var img_url = Images.findOne({_id:report.images[0].fileId}).url();
          
          if (!img_url)
            img_url = "";

          res["asset"] = {
            "media": img_url,
            "credit": report.images[0].copyright,
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
              "headline":"Concept rapporter",
              "type":"default",
              "text":"Evalueringsrapporter av statlige prosjekter.",
              "date": elements
          }
        } 

        var timeline_config = {
          type: 'timeline',
          width: "96%",
          height: "400",
          source: data,
          embed_id: 'timeline-embed',
          start_at_end: true,
          language: VMM.Language.no
        }

        storyjs_embedjs = new VMM.Timeline('timeline-embed', '100%', '400');
        storyjs_embedjs.init(timeline_config);
      }
    }
  });
};

VMM.Language.no = {lang:"no",api:{wikipedia:"no"},date:{month:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],month_abbr:["Jan.","Feb.","Mars","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Des."],day:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],day_abbr:["Søn.","Man.","Tir.","Ons.","Tor.","Fre.","Lør."]},dateformats:{year:"yyyy",month_short:"mmm",month:"mmmm yyyy",full_short:"d. mmm",full:"d. mmmm',' yyyy",time_no_seconds_short:"HH:MM",time_no_seconds_small_date:"HH:MM'<br/><small>'d. mmmm',' yyyy'</small>'",full_long:"dddd',' d. mmm',' yyyy 'kl.' HH:MM",full_long_small_date:"HH:MM'<br/><small>'dddd',' d. mmm',' yyyy'</small>'"},messages:{loading_timeline:"Laster timeline... ",return_to_title:"Tilbake til tittel",expand_timeline:"Utvid timeline",contract_timeline:"Krymp timeline",wikipedia:"Fra Wikipedia, den frie encyklopedi",loading_content:"Laster innhold",loading:"Laster"}};

Template.TimelineReportView.destroyed = function () {

};

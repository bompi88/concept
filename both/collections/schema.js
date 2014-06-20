if(Meteor.isClient){

AutoForm.hooks({
    "report-form": {
        before: {
            insert: function(doc, tmpl) {
                return createReport(tmpl);
            },
            update: function(docId, modifier, tmpl) {
                return createMofidiers(modifier, tmpl);
            },
            remove: function (id, tmpl) {
/*                console.log('jaha');
                var report = Reports.findOne(id);
                var img_ids = _.pluck(report.images, 'fileId');
                var ref_ids = _.pluck(report.references, 'fileId');

                Meteor.call('deleteImages', img_ids);
                Meteor.call('deleteReferences', ref_ids);*/

                return true;
            } 
        },
        onSuccess: function(operation, result, tmpl) {
            if (operation === 'update' )
                return Router.go(Router.path('ReportList') + '/' + tmpl.data.doc._id);
            else
                return Router.go(Router.path('ReportList'));
        },
        onError: function(operation, error, template) { console.log(error);}
    }
});
}

var createMofidiers = function(modifier, tmpl) {

    var coords = locationObject.getCoordinates();
    var lat = "";
    var lng = "";

    if(coords.lat && coords.lng) {
        lat = coords.lat.toString();
        lng = coords.lng.toString();
    }

    var mods = {
        "project.location.coordinates.lat": lat,
        "project.location.coordinates.lng": lng,
        "project.successCategory": parseInt(tmpl.find('input[name="traffic-light"]:checked').value),
        "evaluation.productivity.value": parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value),
        "evaluation.achievement.value": parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value),
        "evaluation.effects.value": parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value),
        "evaluation.relevance.value": parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value),
        "evaluation.viability.value": parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value),
        "evaluation.profitability.value": parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value),
        "_public": parseInt(tmpl.find('input[name="public-var"]:checked').value) == 0
    };
        var imgs_ids = uploadObject.getImages();
      var imgs = [];
  
      for (var i = 0; i < imgs_ids.length; i++){
        var img = {
          fileId: imgs_ids[i],
          title: tmpl.find('#title-' + imgs_ids[i]).value,
          copyright: tmpl.find('#copyright-' + imgs_ids[i]).value,
          link: tmpl.find('#link-' + imgs_ids[i]).value
        };
        imgs.push(img);
      }
      mods["images"] = imgs;
  
      var files_ids = uploadObject.getReferences();
      var files = [];
  
      for (var i = 0; i < files_ids.length; i++){
        var file = {
          fileId: files_ids[i],
          title: tmpl.find('#title-' + files_ids[i]).value,
          typedoc: tmpl.find('#typedoc-' + files_ids[i]).value,
          date: tmpl.find('#date-' + files_ids[i]).value
        };
        files.push(file);
      }
      mods["references"] = files;

    modifier.$set = _.extend(modifier.$set, mods);

    return modifier;
}

var createReport = function(tmpl) {
          // our report document
      var report = {
        project: {},
        evaluation: {}
      };

      // get all variables, and build the document
      report.project.name = tmpl.find('#name').value;
      report.project.projectNumber = parseInt(tmpl.find('#project-num').value);
      report.project.sector = tmpl.find('#sector').value;
  
      report.project.location = {};
  
      report.project.location.name = tmpl.find('#location').value || null;

      var coords = locationObject.getCoordinates();

      report.project.location.coordinates = {};

      report.project.location.coordinates.lat = coords.lat;
      report.project.location.coordinates.lng = coords.lng;
      
      report.project.successCategory = parseInt(tmpl.find('input[name="traffic-light"]:checked').value);
      
      report.project.projectDescription = {};
      report.project.projectDescription.short = tmpl.find('#project-desc-short').value;
      report.project.projectDescription.long = tmpl.find('#project-desc-long').value;
  
      report.project.finishingYear = parseInt(tmpl.find('#finishing-year').value);
      report.project.evaluationYear = parseInt(tmpl.find('#eval-year').value);
      report.project.decisionYear = parseInt(tmpl.find('#decision-year').value);
  
      report.project.managementBudget = {};
      report.project.costBudget = {};
      report.project.costFinal = {};
  
      report.project.managementBudget.year = parseInt(tmpl.find('#decision-year').value);
      report.project.costBudget.year = parseInt(tmpl.find('#decision-year').value);
      report.project.costFinal.year = parseInt(tmpl.find('#finishing-year').value);
  
      report.project.managementBudget.amount = parseInt(tmpl.find('#management-budget').value);
      report.project.costBudget.amount = parseInt(tmpl.find('#cost-budget').value);
      report.project.costFinal.amount = parseInt(tmpl.find('#cost-final').value);
  
      report.responsible = {};
      report.responsible.organization = tmpl.find('#eval-responsible-org').value || null;
      report.responsible.person = tmpl.find('#eval-responsible-person').value || null;
      report.principal = tmpl.find('#principal').value || null;
  
      report.evaluation.productivity = {};
      report.evaluation.achievement = {};
      report.evaluation.effects = {};
      report.evaluation.relevance = {};
      report.evaluation.viability = {};
      report.evaluation.profitability = {};
  
      report.evaluation.productivity.short = tmpl.find('#eval-productivity-short').value || null;
      report.evaluation.productivity.long = tmpl.find('#eval-productivity-long').value || null;

      report.evaluation.achievement.short = tmpl.find('#eval-achievement-short').value || null;
      report.evaluation.achievement.long = tmpl.find('#eval-achievement-long').value || null;
  
      report.evaluation.effects.short = tmpl.find('#eval-effects-short').value || null;
      report.evaluation.effects.long = tmpl.find('#eval-effects-long').value || null;
  
      report.evaluation.relevance.short = tmpl.find('#eval-relevance-short').value || null;
      report.evaluation.relevance.long = tmpl.find('#eval-relevance-long').value || null;
  
      report.evaluation.viability.short = tmpl.find('#eval-viability-short').value || null;
      report.evaluation.viability.long = tmpl.find('#eval-viability-long').value || null;
  
      report.evaluation.profitability.short = tmpl.find('#eval-profitability-short').value || null;
      report.evaluation.profitability.long = tmpl.find('#eval-profitability-long').value || null;
  
      report.evaluation.productivity.value = parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value);
      report.evaluation.achievement.value = parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value);
      report.evaluation.effects.value = parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value);
      report.evaluation.relevance.value = parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value);
      report.evaluation.viability.value = parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value);
      report.evaluation.profitability.value = parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value);
  
      var imgs_ids = uploadObject.getImages();
      var imgs = [];
  
      for (var i = 0; i < imgs_ids.length; i++){
        var img = {
          fileId: imgs_ids[i],
          title: tmpl.find('#title-' + imgs_ids[i]).value,
          copyright: tmpl.find('#copyright-' + imgs_ids[i]).value,
          link: tmpl.find('#link-' + imgs_ids[i]).value
        };
        imgs.push(img);
      }
      report.images = imgs;
  
      var files_ids = uploadObject.getReferences();
      var files = [];
  
      for (var i = 0; i < files_ids.length; i++){
        var file = {
          fileId: files_ids[i],
          title: tmpl.find('#title-' + files_ids[i]).value,
          typedoc: tmpl.find('#typedoc-' + files_ids[i]).value,
          date: tmpl.find('#date-' + files_ids[i]).value
        };
        files.push(file);
      }
      report.references = files;
      report._public = parseInt(tmpl.find('input[name="public-var"]:checked').value) == 0;

      return report;
}

var Schemas = {};

var textAreaRegEx = /^[a-z0-9A-z .,!;\n\r&:%"?æøåÆØÅèÈéÉ\/()-]*$/;
var textFieldRegEx = /^[a-z0-9A-z .,æøåÆØÅèÈéÉ()-]{2,100}$/;

Schemas.Report = new SimpleSchema({
    project: {
        type: Object,
        optional: false
    },
    "project.name": {
    	type: String,
    	label: "Prosjektnavn",
    	optional: false,
    	regEx: textFieldRegEx
    },
    "project.projectNumber": {
    	type: Number,
    	label: "Prosjektnummer (Trailbase)",
    	optional: false,
    	regEx: /^[0-9 ]{1,10}$/
    },
    "project.sector": {
    	type: String,
    	label: "Sektor",
    	optional: false,
		regEx: textFieldRegEx
    },
    "project.location": {
        type: Object,
        optional: false
    },
    "project.location.name": {
    	type: String,
    	label: "Lokasjonsbeskrivelse for evalueringsobjektet",
    	optional: true,
    	regEx: textFieldRegEx
    },
    "project.location.coordinates": {
        type: Object,
        optional: true
    },
    "project.location.coordinates.lat": {
        type: String,
        optional: true
    },
    "project.location.coordinates.lng": {
        type: String,
        optional: true
    },
    "project.successCategory": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-3]$/
    },
    "project.projectDescription": {
        type: Object,
        optional: false
    },
    "project.projectDescription.short": {
    	type: String,
    	label: "Kort prosjektbeskrivelse",
    	optional: false,
    	regEx: textAreaRegEx
    },
    "project.projectDescription.long": {
    	type: String,
    	label: "Utdypende prosjektbeskrivelse og mål/bakgrunn for prosjektet",
    	optional: false,
    	regEx: textAreaRegEx
    },
    "project.finishingYear": {
    	type: Number,
    	label: "Årstall for ferdigstilling av prosjekt",
    	optional: false,
        max:9999,
        min:1900,
    	regEx: /^[0-9]{4}$/
    },
    "project.evaluationYear": {
    	type: Number,
    	label: "Årstall for utført evaluering",
    	optional: false,
        max:9999,
        min:1900,
    	regEx: /^[0-9]{4}$/
    },
    "project.decisionYear": {
    	type: Number,
    	label: "Årstall for vedtak",
    	optional: false,
        max:9999,
        min:1900,
    	regEx: /^[0-9]{4}$/
    },
    "project.managementBudget": {
        type: Object,
        optional: false
    },
    "project.managementBudget.year": {
    	type: Number,
    	optional: false,
    	regEx: /^[0-9]{4}$/
    },
    "project.managementBudget.amount": {
    	type: Number,
    	label: "Styringsramme (i millioner NOK)",
    	optional: false,
    	regEx: /^[0-9]{1-10}$/
    },
    "project.costBudget": {
        type: Object,
        optional: false
    },
    "project.costBudget.year": {
    	type: Number,
    	optional: false,
    	regEx: /^[0-9]{4}$/
    },
    "project.costBudget.amount": {
    	type: Number,
    	label: "Kostnadsramme (i millioner NOK)",
    	optional: false,
    	regEx: /^[0-9]{1-10}$/
    },
    "project.costFinal": {
        type: Object,
        optional: false
    },
    "project.costFinal.year": {
    	type: Number,
    	optional: false,
    	regEx: /^[0-9]{4}$/
    },
    "project.costFinal.amount": {
    	type: Number,
    	label: "Sluttkostnad (i millioner NOK)",
    	optional: false,
    	regEx: /^[0-9]{1-10}$/
    },
    "evaluation": {
        type: Object,
        optional: false
    },
    "evaluation.productivity": {
        type: Object,
        optional: false
    },
    "evaluation.productivity.short": {
    	type: String,
    	label: "Kort vurdering av produktivitet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.productivity.long": {
    	type: String,
    	label: "Utdypende vurdering av produktivitet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.productivity.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "evaluation.achievement": {
        type: Object,
        optional: false
    },
    "evaluation.achievement.short": {
    	type: String,
    	label: "Kort vurdering av måloppnåelse",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.achievement.long": {
    	type: String,
    	label: "Utdypende vurdering av måloppnåelse",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.achievement.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "evaluation.effects": {
        type: Object,
        optional: false
    },
    "evaluation.effects.short": {
    	type: String,
    	label: "Kort vurdering av virkninger",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.effects.long": {
    	type: String,
    	label: "Utdypende vurdering av virkninger",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.effects.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "evaluation.relevance": {
        type: Object,
        optional: false
    },
    "evaluation.relevance.short": {
    	type: String,
    	label: "Kort vurdering av relevans",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.relevance.long": {
    	type: String,
    	label: "Utdypende vurdering av relevans",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.relevance.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "evaluation.viability": {
        type: Object,
        optional: false
    },
    "evaluation.viability.short": {
    	type: String,
    	label: "Kort vurdering av levedyktighet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.viability.long": {
    	type: String,
    	label: "Utdypende vurdering av levedyktighet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.viability.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "evaluation.profitability": {
        type: Object,
        optional: false
    },
    "evaluation.profitability.short": {
    	type: String,
    	label: "Kort vurdering av samfunnsøkonomisk lønnsomhet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.profitability.long": {
    	type: String,
    	label: "Utdypende vurdering av samfunnsøkonomisk lønnsomhet",
    	optional: true,
    	regEx: textAreaRegEx
    },
    "evaluation.profitability.value": {
    	type: Number,
    	optional: false,
    	regEx: /^[1-6]$/
    },
    "responsible": {
        type: Object,
        optional: false
    },
    "responsible.organization": {
    	type: String,
    	label: "Evalueringsansvarlig instans",
    	optional: false,
		regEx: textFieldRegEx
    },
    "responsible.person": {
    	type: String,
    	label: "Evalueringsansvarlig person",
    	optional: true,
		regEx: textFieldRegEx
    },
    "principal": {
    	type: String,
    	label: "Oppdragsgiver",
    	optional: false,
		regEx: textFieldRegEx
    },
    "images": {
        type: [Object],
        optional: false
    },
    "images.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "images.$.title": {
    	type: String,
    	label: "Tittel",
    	optional: true/*,
		regEx: textFieldRegEx*/
    },
    "images.$.copyright": {
    	type: String,
    	label: "Kilde",
    	optional: true/*,
		regEx: textFieldRegEx*/
    },
    "images.$.link": {
    	type: String,
    	label: "Kilde-URL",
    	optional: true/*,
		regEx: SimpleSchema.RegEx.Url*/
    },
    "references": {
        type: [Object],
        optional: false
    },
    "references.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "references.$.title": {
    	type: String,
    	label: "Tittel",
    	optional: true/*,
		regEx: textFieldRegEx*/
    },
    "references.$.typedoc": {
    	type: String,
    	label: "Dokumenttype",
    	optional: true/*,
		regEx: textFieldRegEx*/
    },
    "references.$.date": {
    	type: String,
    	label: "Dato",
    	optional: true/*,
		regEx: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    */},
    "_id": {
        type: String,
        denyInsert: true,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "_public": {
        type: Boolean,
        optional: false
    }
});

Schemas.Report.messages({
    required: "[label] må fylles ut",
    minString: "[label] må inneholde minimum [min] tegn",
    maxString: "[label] må ikke overskride [max] tegn",
    minNumber: "[label] må minst være [min]",
    maxNumber: "[label] må ikke overskride [max]",
    minDate: "[label] må være enten på eller før [min]",
    maxDate: "[label] kan ikke være etter [max]",
    minCount: "Du må spesifisere minst [minCount] verdier",
    maxCount: "Du kan ikke spesifisere mer enn [maxCount] verdier",
    noDecimal: "[label] må inneholde et heltall",
    notAllowed: "[value] er ikke en gyldig verdi",
    expectedString: "[label] må inneholde en streng",
    expectedNumber: "[label] må inneholde et tall",
    expectedBoolean: "[label] må være en bolsk verdi",
    expectedArray: "[label] må være en liste",
    expectedObject: "[label] må være et objekt",
    expectedConstructor: "[label] må være av type [type]",
    regEx: "[label] feilet ved regulær sjekk av innholdet"
});

Reports.attachSchema(Schemas.Report);
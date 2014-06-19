if(Meteor.isClient){

AutoForm.hooks({
    "report-form": {
        before: {
            insert: function(doc, tmpl) {
                 var c = createReport(tmpl);
                console.log(c)
                return c;
            },
            update: function(docId, modifier, tmpl) {
                return createMofidiers(modifier, tmpl);
            },
            onSuccess: function(operation, result, tmpl) {
                console.log('sdf')
                Router.go(Router.path('ReportList'));
            }
        }
    }
});
}

var createMofidiers = function(modifier, tmpl) {

    var coords = locationObject.getCoordinates();

    var lat = coords.lat.toString();
    var lng = coords.lng.toString();

    var mods = {
        "project.location.coordinates.lat": lat,
        "project.location.coordinates.lng": lng,
        "project.successCategory": parseInt(tmpl.find('input[name="traffic-light"]:checked').value),
        "evaluation.productivity.value": parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value),
        "evaluation.achievement.value": parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value),
        "evaluation.effects.value": parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value),
        "evaluation.relevance.value": parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value),
        "evaluation.viability.value": parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value),
        "evaluation.profitability.value": parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value)
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

    console.log(mods)
    modifier.$set = _.extend(modifier.$set, mods);
    console.log(modifier);
    return modifier;
}

var createReport = function(tmpl) {
          // our report document
      var report = {
        project: {},
        evaluation: {}
      };

      // get all variables, and build the document
      report.project.name = tmpl.find('#name').value || null;
      report.project.projectNumber = parseInt(tmpl.find('#project-num').value) || 0;
      report.project.sector = tmpl.find('#sector').value || null;
  
      report.project.location = {};
  
      report.project.location.name = tmpl.find('#location').value || null;

      var coords = locationObject.getCoordinates();

      report.project.location.coordinates = {};

      report.project.location.coordinates.lat = coords.lat;
      report.project.location.coordinates.lng = coords.lng;
      
      report.project.successCategory = parseInt(tmpl.find('input[name="traffic-light"]:checked').value) || 1;
      
      report.project.projectDescription = {};
      report.project.projectDescription.short = tmpl.find('#project-desc-short').value || null;
      report.project.projectDescription.long = tmpl.find('#project-desc-long').value || null;
  
      report.project.finishingYear = parseInt(tmpl.find('#finishing-year').value) || 0;
      report.project.evaluationYear = parseInt(tmpl.find('#eval-year').value) || 0;
      report.project.decisionYear = parseInt(tmpl.find('#decision-year').value) || 0;
  
      report.project.managementBudget = {};
      report.project.costBudget = {};
      report.project.costFinal = {};
  
      report.project.managementBudget.year = parseInt(tmpl.find('#decision-year').value) || 0;
      report.project.costBudget.year = parseInt(tmpl.find('#decision-year').value) || 0;
      report.project.costFinal.year = parseInt(tmpl.find('#finishing-year').value) || 0;
  
      report.project.managementBudget.amount = parseInt(tmpl.find('#management-budget').value) || 0;
      report.project.costBudget.amount = parseInt(tmpl.find('#cost-budget').value) || 0;
      report.project.costFinal.amount = parseInt(tmpl.find('#cost-final').value) || 0;
  
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
      return report;
}

var Schemas = {};

Schemas.Report = new SimpleSchema({
    project: {
        type: Object,
        optional: true
    },
    "project.name": {
    	type: String,
    	label: "Prosjektnavn",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,æøåè()-]{3,100}$/
    },
    "project.projectNumber": {
    	type: Number,
    	label: "Prosjektnummer (Trailbase)",
    	optional: true,
    	regEx: /^[0-9 ]{1,10}$/
    },
    "project.sector": {
    	type: String,
    	label: "Sektor",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "project.location": {
        type: Object,
        optional: true
    },
    "project.location.name": {
    	type: String,
    	label: "Lokasjonsbeskrivelse for evalueringsobjektet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,æøåè()-]{3,100}$/
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
    	optional: true,
    	regEx: /^[1-3 ]$/
    },
    "project.projectDescription": {
        type: Object,
        optional: true
    },
    "project.projectDescription.short": {
    	type: String,
    	label: "Kort prosjektbeskrivelse",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "project.projectDescription.long": {
    	type: String,
    	label: "Utdypende prosjektbeskrivelse og mål/bakgrunn for prosjektet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "project.finishingYear": {
    	type: Number,
    	label: "Årstall for ferdigstilling av prosjekt",
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.evaluationYear": {
    	type: Number,
    	label: "Årstall for utført evaluering",
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.decisionYear": {
    	type: Number,
    	label: "Årstall for vedtak",
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.managementBudget": {
        type: Object,
        optional: true
    },
    "project.managementBudget.year": {
    	type: Number,
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.managementBudget.amount": {
    	type: Number,
    	label: "Styringsramme (i millioner NOK)",
    	optional: true,
    	regEx: /^[0-9]{1-10}$/
    },
    "project.costBudget": {
        type: Object,
        optional: true
    },
    "project.costBudget.year": {
    	type: Number,
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.costBudget.amount": {
    	type: Number,
    	label: "Kostnadsramme (i millioner NOK)",
    	optional: true,
    	regEx: /^[0-9]{1-10}$/
    },
    "project.costFinal": {
        type: Object,
        optional: true
    },
    "project.costFinal.year": {
    	type: Number,
    	optional: true,
    	regEx: /^[0-9]{4}$/
    },
    "project.costFinal.amount": {
    	type: Number,
    	label: "Sluttkostnad (i millioner NOK)",
    	optional: true,
    	regEx: /^[0-9]{1-10}$/
    },
    "evaluation": {
        type: Object,
        optional: true
    },
    "evaluation.productivity": {
        type: Object,
        optional: true
    },
    "evaluation.productivity.short": {
    	type: String,
    	label: "Kort vurdering av produktivitet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.productivity.long": {
    	type: String,
    	label: "Utdypende vurdering av produktivitet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.productivity.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "evaluation.achievement": {
        type: Object,
        optional: true
    },
    "evaluation.achievement.short": {
    	type: String,
    	label: "Kort vurdering av måloppnåelse",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.achievement.long": {
    	type: String,
    	label: "Utdypende vurdering av måloppnåelse",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.achievement.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "evaluation.effects": {
        type: Object,
        optional: true
    },
    "evaluation.effects.short": {
    	type: String,
    	label: "Kort vurdering av virkninger",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.effects.long": {
    	type: String,
    	label: "Utdypende vurdering av virkninger",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.effects.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "evaluation.relevance": {
        type: Object,
        optional: true
    },
    "evaluation.relevance.short": {
    	type: String,
    	label: "Kort vurdering av relevans",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.relevance.long": {
    	type: String,
    	label: "Utdypende vurdering av relevans",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.relevance.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "evaluation.viability": {
        type: Object,
        optional: true
    },
    "evaluation.viability.short": {
    	type: String,
    	label: "Kort vurdering av levedyktighet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.viability.long": {
    	type: String,
    	label: "Utdypende vurdering av levedyktighet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.viability.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "evaluation.profitability": {
        type: Object,
        optional: true
    },
    "evaluation.profitability.short": {
    	type: String,
    	label: "Kort vurdering av samfunnsøkonomisk lønnsomhet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.profitability.long": {
    	type: String,
    	label: "Utdypende vurdering av samfunnsøkonomisk lønnsomhet",
    	optional: true,
    	regEx: /^[a-z0-9A-z .,!;\n\r&:%"?æøåè\/()-]*$/
    },
    "evaluation.profitability.value": {
    	type: Number,
    	optional: true,
    	regEx: /^[1-6]$/
    },
    "responsible": {
        type: Object,
        optional: true
    },
    "responsible.organization": {
    	type: String,
    	label: "Evalueringsansvarlig instans",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "responsible.person": {
    	type: String,
    	label: "Evalueringsansvarlig person",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "principal": {
    	type: String,
    	label: "Oppdragsgiver",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "images": {
        type: [Object],
        optional: true
    },
    "images.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "images.$.title": {
    	type: String,
    	label: "Tittel",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "images.$.copyright": {
    	type: String,
    	label: "Kilde",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "images.$.link": {
    	type: String,
    	label: "Kilde",
    	optional: true,
		regEx: SimpleSchema.RegEx.Url
    },
    "references": {
        type: [Object],
        optional: true
    },
    "references.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "references.$.title": {
    	type: String,
    	label: "Tittel",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "references.$.typedoc": {
    	type: String,
    	label: "Dokumenttype",
    	optional: true,
		regEx: /^[a-z0-9A-z .,æøåè()-]{2,100}$/
    },
    "references.$.date": {
    	type: String,
    	label: "Dato",
    	optional: true,
		regEx: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    },
    "_id": {
        type: String,
        denyInsert: true,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
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
/**
 * Reports Collection
 */

Reports = new Meteor.Collection('reports');

evaluateProject = function(evaluations) {
    // determine success category by calculating the mean score and map to three equal intervals
    //1 - 2.66 is RED (1), 2.66 - 4.32 is ORANGE (2), and 4.32-6 is GREEN (3)
    var criteriaCount = (evaluations[0] && 1) + (evaluations[1] && 1) + (evaluations[2] && 1) + (evaluations[3] && 1) + (evaluations[4] && 1) + (evaluations[5] && 1);
    //RED by default
    var success = 1;

    var k;
    var lessThanFour = false;
    var reds = 0;

    for(k = 0; k < evaluations.length; k++) {
        var val = evaluations[k];
        if(val < 4) {
            lessThanFour = true;
        }
        if(val < 3) {
            reds++;
        }
    }

    var meanScore = (evaluations[0] + evaluations[1] + evaluations[2] + evaluations[3] + evaluations[4] + evaluations[5])/criteriaCount;
    
    if(meanScore > (8/3) && meanScore <= (13/3)) {
        success = 2;
    } else if(meanScore > (13/3)) {
        if(lessThanFour) {
            success = 2;
        } else {
            success = 3;
        }
    }

    if(reds >= 3) {
        success = 1;
    }

    return success;
}

createMofidiers = function(modifier, tmpl) {
    "use strict";

    var coords = locationObject.getCoordinates();
    var lat = "";
    var lng = "";

    if(coords.lat && coords.lng) {
        lat = coords.lat.toString();
        lng = coords.lng.toString();
    }

    var productivityValue = parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value);
    var achievementValue = parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value);
    var effectsValue = parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value);
    var relevanceValue = parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value);
    var viabilityValue = parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value);
    var profitabilityValue = parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value);

    var evaluations = [productivityValue, achievementValue, effectsValue, relevanceValue, viabilityValue, profitabilityValue];

    var success = evaluateProject(evaluations);

    // omit invalid $unset variables, those who are required
    modifier.$unset = _.omit(modifier.$unset, [
        "project.location",
        "evaluation.productivity",
        "evaluation.achievement",
        "evaluation.effects",
        "evaluation.relevance",
        "evaluation.viability",
        "evaluation.profitability",
        "project.managementBudget",
        "project.costBudget",
        "project.costFinal",
        "responsible",
        "evaluation.overall",
        "project.location.coordinates"
    ]);


    var mods = {
        "project.location" : {
            coordinates: {
                lat: lat || null,
                lng: lng || null
            }
        },
        "project.successCategory": success,
        "evaluation.productivity.value": productivityValue,
        "evaluation.achievement.value": achievementValue,
        "evaluation.effects.value": effectsValue,
        "evaluation.relevance.value": relevanceValue,
        "evaluation.viability.value": viabilityValue,
        "evaluation.profitability.value": profitabilityValue,
        "_public": parseInt(tmpl.find('input[name="public-var"]:checked').value) === 1
    };

    var imgsIds = uploadObject.getImages();
    var imgs = [];

    if(imgsIds.length > 0) {
      for (var i = 0; i < imgsIds.length; i++){
        var img = {
            fileId: imgsIds[i],
            title: tmpl.find('#title-' + imgsIds[i]) && tmpl.find('#title-' + imgsIds[i]).value || null,
            copyright: tmpl.find('#copyright-' + imgsIds[i]) && tmpl.find('#copyright-' + imgsIds[i]).value || null,
            link: tmpl.find('#link-' + imgsIds[i]) &&  tmpl.find('#link-' + imgsIds[i]).value || null
        };
        if(Images.findOne({ _id: imgsIds[i]}))
          imgs.push(img);
      }
    }

    mods.images = imgs;

    var filesIds = uploadObject.getReferences();
    var files = [];

    if(filesIds.length > 0) {
      for (var i = 0; i < filesIds.length; i++){
        var file = {
            fileId: filesIds[i],
            title: tmpl.find('#title-' + filesIds[i]) && tmpl.find('#title-' + filesIds[i]).value || null,
            typedoc: tmpl.find('#typedoc-' + filesIds[i]) && tmpl.find('#typedoc-' + filesIds[i]).value || null,
            date: tmpl.find('#date-' + filesIds[i]) && tmpl.find('#date-' + filesIds[i]).value || null
        };
      if(Files.findOne({ _id: filesIds[i]}))
        files.push(file);
      }
    }

    mods.references = files;

    modifier.$set = _.extend(modifier.$set, mods);
    console.log(modifier)
    return modifier;
};

createReport = function(tmpl) {
    "use strict";

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

    report.project.location.name = tmpl.find('#location').value || "";

    var coords = locationObject.getCoordinates();

    report.project.location.coordinates = {};

    report.project.location.coordinates.lat = coords.lat;
    report.project.location.coordinates.lng = coords.lng;

    report.project.projectDescription = {};
    report.project.projectDescription.short = tmpl.find('#project-desc-short').value;
    report.project.projectDescription.long = tmpl.find('#project-desc-long').value;

    report.project.finishingYear = parseInt(tmpl.find('#finishing-year').value) || null;
    report.project.evaluationYear = parseInt(tmpl.find('#eval-year').value) || null;
    report.project.decisionYear = parseInt(tmpl.find('#decision-year').value) || null;

    report.project.managementBudget = {};
    report.project.costBudget = {};
    report.project.costFinal = {};

    report.project.managementBudget.year = parseInt(tmpl.find('#management-budget-year').value) || null;
    report.project.costBudget.year = parseInt(tmpl.find('#cost-budget-year').value) || null;
    report.project.costFinal.year = parseInt(tmpl.find('#cost-final-year').value) || null;

    report.project.managementBudget.amount = parseInt(tmpl.find('#management-budget').value) || null;
    report.project.costBudget.amount = parseInt(tmpl.find('#cost-budget').value) || null;
    report.project.costFinal.amount = parseInt(tmpl.find('#cost-final').value) || null;

    report.responsible = {};
    report.responsible.organization = tmpl.find('#eval-responsible-org').value || "";
    report.responsible.person = tmpl.find('#eval-responsible-person').value || "";

    report.evaluation.overall = {};
    report.evaluation.productivity = {};
    report.evaluation.achievement = {};
    report.evaluation.effects = {};
    report.evaluation.relevance = {};
    report.evaluation.viability = {};
    report.evaluation.profitability = {};

    report.evaluation.overall.short = tmpl.find('#eval-overall-short').value || "";
    report.evaluation.overall.long = tmpl.find('#eval-overall-long').value || "";

    report.evaluation.productivity.short = tmpl.find('#eval-productivity-short').value || "";
    report.evaluation.productivity.long = tmpl.find('#eval-productivity-long').value || "";

    report.evaluation.achievement.short = tmpl.find('#eval-achievement-short').value || "";
    report.evaluation.achievement.long = tmpl.find('#eval-achievement-long').value || "";

    report.evaluation.effects.short = tmpl.find('#eval-effects-short').value || "";
    report.evaluation.effects.long = tmpl.find('#eval-effects-long').value || "";

    report.evaluation.relevance.short = tmpl.find('#eval-relevance-short').value || "";
    report.evaluation.relevance.long = tmpl.find('#eval-relevance-long').value || "";

    report.evaluation.viability.short = tmpl.find('#eval-viability-short').value || "";
    report.evaluation.viability.long = tmpl.find('#eval-viability-long').value || "";

    report.evaluation.profitability.short = tmpl.find('#eval-profitability-short').value || "";
    report.evaluation.profitability.long = tmpl.find('#eval-profitability-long').value || "";

    var productivityValue = parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value);
    var achievementValue = parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value);
    var effectsValue = parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value);
    var relevanceValue = parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value);
    var viabilityValue = parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value);
    var profitabilityValue = parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value);

    report.evaluation.productivity.value = productivityValue;
    report.evaluation.achievement.value = achievementValue;
    report.evaluation.effects.value = effectsValue;
    report.evaluation.relevance.value = relevanceValue;
    report.evaluation.viability.value = viabilityValue;
    report.evaluation.profitability.value = profitabilityValue;

    var evaluations = [productivityValue, achievementValue, effectsValue, relevanceValue, viabilityValue, profitabilityValue];

    var success = evaluateProject(evaluations);


    report.project.successCategory = success;

    var imgsIds = uploadObject.getImages();
    var imgs = [];

    if(imgsIds.length > 0) {
      for (var i = 0; i < imgsIds.length; i++){
        var img = {
            fileId: imgsIds[i],
            title: tmpl.find('#title-' + imgsIds[i]).value,
            copyright: tmpl.find('#copyright-' + imgsIds[i]).value,
            link: tmpl.find('#link-' + imgsIds[i]).value
        };
        imgs.push(img);
      }
    }

    report.images = imgs;

    var filesIds = uploadObject.getReferences();
    var files = [];

    if(filesIds.length > 0) {
      for (var i = 0; i < filesIds.length; i++){
        var file = {
            fileId: filesIds[i],
            title: tmpl.find('#title-' + filesIds[i]).value,
            typedoc: tmpl.find('#typedoc-' + filesIds[i]).value,
            date: tmpl.find('#date-' + filesIds[i]).value
        };
        files.push(file);
      }
    }

    report.references = files;
    report._public = parseInt(tmpl.find('input[name="public-var"]:checked').value) === 1;

    return report;
};

/*****************************************************************************/
/* Reports Collection */
/*****************************************************************************/

Reports = new Meteor.Collection('reports');

createMofidiers = function(modifier, tmpl) {

    var coords = locationObject.getCoordinates();
    var lat = "";
    var lng = "";

    if(coords.lat && coords.lng) {
        lat = coords.lat.toString();
        lng = coords.lng.toString();
    }

    var productivity_value = parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value);
    var achievement_value = parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value);
    var effects_value = parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value);
    var relevance_value = parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value);
    var viability_value = parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value);
    var profitability_value = parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value);

    var success = Math.round((((productivity_value + achievement_value + effects_value + relevance_value + viability_value + profitability_value - 6)/31) + (1/6)) * 3);

    console.log(success)
    var mods = {
        "project.location.coordinates.lat": lat,
        "project.location.coordinates.lng": lng,
        "project.successCategory": success,
        "evaluation.productivity.value": productivity_value,
        "evaluation.achievement.value": achievement_value,
        "evaluation.effects.value": effects_value,
        "evaluation.relevance.value": relevance_value,
        "evaluation.viability.value": viability_value,
        "evaluation.profitability.value": profitability_value,
        "_public": parseInt(tmpl.find('input[name="public-var"]:checked').value) == 1
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

createReport = function(tmpl) {
    
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

    report.project.finishingYear = parseInt(tmpl.find('#finishing-year').value);
    report.project.evaluationYear = parseInt(tmpl.find('#eval-year').value);
    report.project.decisionYear = parseInt(tmpl.find('#decision-year').value);

    report.project.managementBudget = {};
    report.project.costBudget = {};
    report.project.costFinal = {};

    report.project.managementBudget.year = parseInt(tmpl.find('#management-budget-year').value);
    report.project.costBudget.year = parseInt(tmpl.find('#cost-budget-year').value);
    report.project.costFinal.year = parseInt(tmpl.find('#cost-final-year').value);

    report.project.managementBudget.amount = parseInt(tmpl.find('#management-budget').value);
    report.project.costBudget.amount = parseInt(tmpl.find('#cost-budget').value);
    report.project.costFinal.amount = parseInt(tmpl.find('#cost-final').value);

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

    var productivity_value = parseInt(tmpl.find('input[name="num-eval-productivity"]:checked').value);
    var achievement_value = parseInt(tmpl.find('input[name="num-eval-achievement"]:checked').value);
    var effects_value = parseInt(tmpl.find('input[name="num-eval-effects"]:checked').value);
    var relevance_value = parseInt(tmpl.find('input[name="num-eval-relevance"]:checked').value);
    var viability_value = parseInt(tmpl.find('input[name="num-eval-viability"]:checked').value);
    var profitability_value = parseInt(tmpl.find('input[name="num-eval-profitability"]:checked').value);

    report.evaluation.productivity.value = productivity_value;
    report.evaluation.achievement.value = achievement_value;
    report.evaluation.effects.value = effects_value;
    report.evaluation.relevance.value = relevance_value;
    report.evaluation.viability.value = viability_value;
    report.evaluation.profitability.value = profitability_value;

    report.project.successCategory = Math.round((((productivity_value + achievement_value + effects_value + relevance_value + viability_value + profitability_value - 6)/31) + (1/6)) * 3);

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
    report._public = parseInt(tmpl.find('input[name="public-var"]:checked').value) == 1;

    return report;
}
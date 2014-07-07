/**
 * Filter: Filter projects
 */


//all the reports ready for csv export
var reportsExport;


// -- Events --------------------------------------------------------

Template.Filter.events({

	'click .dropdown-menu li': function(event, tmpl) {
		var chosenAttribute = $(event.currentTarget).text();
		var elementType = $(event.currentTarget).attr('class');
		var dropdownType = "";

		//which dropdown was clicked?
		if(elementType === "attribute-item")
			dropdownType = "#attribute-picker";
		else if(elementType == "operator-item")
			dropdownType = "#operator-picker";

		//replace button text in dropdown with chosen element
  		$('.btn-group').find(dropdownType).html(chosenAttribute+' <span class="caret"></span>');

	},

	'click #add-filter' : function(event, tmpl) {
		var value = tmpl.find('#value-picker').value;

		//parse value to int if possible
		if(!isNaN(value))
			value = parseInt(value);

		//create a filter object
		var filter = {
			"attribute": tmpl.find('#attribute-picker').text.trim(),
			"operator": tmpl.find('#operator-picker').text.trim(),
			"value": value
		}

		//if the filter validates, set new session variable
		if(validateFilter(filter)) {
			var filters = Session.get('filters');
			filters.push(filter);
			Session.set('filters', filters);
      queryBuilder();

		}
		else {
			//TODO: Red text in page instead of modal?
			bootbox.alert("Sjekk at attributt, operator og verdi gir mening sammen.");
		}



	},


});

Template.FilterList.events({
	'click #remove-filter': function(event, tmpl) {
		var filters = Session.get('filters');
		var oldFilter = this;
		//use underscorejs reject to remove the old filter and update session variable
		var newFilters = _.reject(filters, function(filter){
			if(filter.attribute===oldFilter.attribute && filter.operator===oldFilter.operator && filter.value===oldFilter.value)
				return true
			});
		Session.set('filters', newFilters);
    queryBuilder();


	}
});


// -- Template Helpers --------------------------------------------------------


Template.FilterList.filters = function() {
	return Session.get('filters');
}


var queryBuilder = function() {
  var filters = Session.get('filters');
  var query = {};

  if(filters.length > 1) {

    query['$and'] = [];

    var i;
    for (i = 0; i < filters.length; i++) {
      var filter = filters[i];
      var field = attToField(filter.attribute).toString();
      var value = filter.value;
      var operator = filter.operator;

      if(operator == 'er lik') {
        var q = {};
        q[field] = value;
        query['$and'].push(q);
      }
      else if(operator == 'inneholder') {
        var q = {};
        q[field] = {$regex: value, $options: 'i'};
        query['$and'].push(q);
      }
      else if(operator == 'større enn') {
        var q = {};
        q[field] = {$gt: value};
        query['$and'].push(q);
      }
      else if(operator == 'mindre enn') {
        var q = {};
        q[field] = {$lt: value};
        query['$and'].push(q);
      }

    }
  }

  else if(filters.length === 1) {
    var filter = filters[0];
    var value = filter.value
    var operator = filter.operator;
    var field = attToField(filter.attribute).toString();

    if(operator == 'er lik')
      query[field] = value;
    else if(operator == 'inneholder')
      query[field] = {$regex: value, $options: 'i'};
    else if(operator == 'større enn')
      query[field] = {$gt: value};
    else if(operator == 'mindre enn')
      query[field] = {$lt: value};


  }
  Session.set('query', query);
};



var attToField = function(attribute) {
  if(attribute === 'Sektor')
    return 'project.sector';
  else if(attribute === 'Navn')
    return 'project.name';
  else if(attribute === 'Evaluator')
    return 'responsible.organization';
  else if(attribute === 'Suksesskategori')
    return 'project.successCategory';
  else if(attribute === 'Årstall ferdigstilt')
    return 'project.finishingYear';
  else if(attribute === 'Årstall evaluering')
    return 'project.evaluationYear';
  else if(attribute === 'Styringsramme')
    return 'project.managementBudget.amount';
  else if(attribute === 'Sluttkostnad')
    return 'project.costFinal.amount';
  else if(attribute === 'Produktivitet')
    return 'project.evaluation.productivity.value';
  else if(attribute === 'Måloppnåelse')
    return 'project.evaluation.achievement.value';
  else if(attribute === 'Virkninger')
    return 'project.evaluation.effects.value';
  else if(attribute === 'Relevans')
    return 'project.evaluation.relevance.value';
  else if(attribute === 'Levedyktighet')
    return 'project.evaluation.viability.value';
  else if(attribute === 'Samf.øk lønnsomhet')
    return 'project.evaluation.profitability.value';
  else return false;
};


/**
 * All possible filter combinations are allowed from the user interface.
 * Therefore they have to pass through this validate method.
 */

function validateFilter(filter) {

	var checklist = {
		"string": {
			"attributes": ["Sektor", "Navn", "Evaluator"],
			"operators": ["er lik", "inneholder"]
		},
		"number": {
			"attributes": ["Suksesskategori", "Årstall ferdigstilt", "Årstall evaluering", "Styringsramme", "Sluttkostnad", "Produktivitet", "Måloppnåelse", "Samf.øk lønnsomhet", "Virkninger", "Levedyktighet", "Relevans"],
			"operators": ["er lik", "større enn", "mindre enn"]
		}
	};

	//check if the attribute is in the string allowed attributes
	if(_.contains(checklist.string.attributes, filter.attribute)) {
		//check if operator is in the string allowed operators
		if(_.contains(checklist.string.operators, filter.operator)) {
			//check if the value is a string or an instance of string
			if(typeof filter.value == "string" || filter.value instanceof String) {
				return true;
			}
		}

	}
	//check the attribute is in the number allowed attributes
	else if(_.contains(checklist.number.attributes, filter.attribute)) {
		//check if the operator is in the number allowed operators
		if(_.contains(checklist.number.operators, filter.operator)) {
			//check if if the value is indeed an int
			if(!isNaN(filter.value)) {
				return true;
			}
		}
	}

	return false;

}

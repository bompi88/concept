/**
 * Filter: Filter projects
 */

// -- Events --------------------------------------------------------

Template.AttributePicker.events({
  'click .dropdown-menu li': function(event, tmpl) {
    var chosenAttribute = $(event.currentTarget).text();

    //replace button text in dropdown with chosen element
    $('#attribute-picker').html(chosenAttribute + ' <span class="caret"></span>');
  }
});

Template.OperatorPicker.events({
  'click .dropdown-menu li': function(event, tmpl) {
    var chosenAttribute = $(event.currentTarget).text();

    //replace button text in dropdown with chosen element
    $('#operator-picker').html(chosenAttribute + ' <span class="caret"></span>');
  }
});

Template.Filter.events({
  'submit form.form-inline': function(evt, tmpl) {
    evt.preventDefault();
    evt.stopPropagation();
    addFilter(evt, tmpl);
  }
});

var addFilter = function(evt, tmpl) {
  var el = tmpl.find('#value-picker');
  var value = el.value;

  if(!isNaN(parseInt(value, 10))) {
    value = parseInt(value, 10);
  } else {
    value = value.trim().toLowerCase();
  }

  if (value === '') {
    return false;
  }

  //create a filter object
  var filter = {
    "attribute": $('#attribute-picker').text().trim(),
    "operator": $('#operator-picker').text().trim(),
    "value": value
  }

  //if the filter validates, set new session variable
  if(validateFilter(filter)) {
    var filters = Session.get('filters');
    filters.push(filter);

    filters = _.unique(filters, false, function(filter) {
      return filter.attribute + filter.operator + filter.value;
    });

    Session.set('filters', filters);
    queryBuilder();

    el.value = "";
  } else {
    //TODO: Red text in page instead of modal?
    bootbox.alert("Sjekk at attributt, operator og verdi gir mening sammen.");
  }
}

Template.FilterList.events({
	'click .remove-filter': function(event, tmpl) {
		var filters = Session.get('filters');
		var oldFilter = this;
		//use underscorejs reject to remove the old filter and update session variable
		var newFilters = _.reject(filters, function(filter){
      if(filter.attribute===oldFilter.attribute && filter.operator===oldFilter.operator && filter.value===oldFilter.value) {
  			return true
      }
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

  if(filters && filters.length)
    query['$and'] = [];

  _.each(filters, function(filter) {

    var field = attToField(filter.attribute).toString();
    var value = filter.value;
    var operator = filter.operator;

    if(operator === 'er lik') {
      var q = {};
      if(_.isString(value)) {
        value = value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        q[field] = { $regex: "^" + value + "$", $options: 'i' };
      } else {
         q[field] = value;
      }

      this.push(q);
    }
    else if(operator === 'inneholder') {
      var q = {};
      value = value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      q[field] = { $regex: value, $options: 'i' };
      this.push(q);
    }
    else if(operator === 'større enn') {
      var q = {};
      q[field] = { $gt: value };
      this.push(q);
    }
    else if(operator === 'mindre enn') {
      var q = {};
      q[field] = { $lt: value };
      this.push(q);
    }
  }, query['$and']);

  Session.set('query', query);
};

//this method is also used in search.js so we make it global
attToField = function(attribute) {
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
    return 'evaluation.productivity.value';
  else if(attribute === 'Måloppnåelse')
    return 'evaluation.achievement.value';
  else if(attribute === 'Virkninger')
    return 'evaluation.effects.value';
  else if(attribute === 'Relevans')
    return 'evaluation.relevance.value';
  else if(attribute === 'Levedyktighet')
    return 'evaluation.viability.value';
  else if(attribute === 'Samf.øk lønnsomhet')
    return 'evaluation.profitability.value';
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

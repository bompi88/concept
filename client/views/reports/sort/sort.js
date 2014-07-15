Template.SortBox.helpers({
  currentSort: function() {
    var text = '';
    var curSort = Session.get('sortBy');

    if (curSort === 'project.name') {
      text = 'Navn';
    } else if (curSort === 'project.successCategory') {
      text = 'Suksesskategori';
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
    } else if (curSort === 'project.costBudget.amount') {
      text = 'Kostnadsramme';
    } else if (curSort === 'responsible.organization') {
      text = 'Evaluator';
    }
    return text;
  },
  currentSortDirection: function() {
    var order = Session.get('sortOrder');
    var type = Session.get('sortType');
    if(order === 'asc') {
      if(type === 'string')
        return 'glyphicon glyphicon-sort-by-alphabet';
      else
        return 'glyphicon glyphicon-sort-by-order';
    }
    else {
      if(type === 'string')
        return 'glyphicon glyphicon-sort-by-alphabet-alt';
      else
        return 'glyphicon glyphicon-sort-by-order-alt';
    }

  }

});

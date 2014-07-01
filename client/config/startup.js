/**
 * Startup configurations
 */
Meteor.startup(function() {

	// Specify the site language
	$('html').attr('lang', 'no-nb');

  // Set the internationalization
  i18n.setLanguage('nb_NO');

	// Dirty hack for dismissing modal by clicking outside it. so we dont have to fork bootbox
	$(document).on('click', '.bootbox', function(){
    var classname = event.target.className;

    if(classname && !$('.' + classname).parents('.modal-dialog').length)
      bootbox.hideAll();
	});
});

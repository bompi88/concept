Meteor.startup(function() {
	//specify the site language
	$('html').attr('lang', 'no-nb');

	//display a warning if the user has an outdated browser
	var $buoop = {}; 
	$buoop.ol = window.onload; 
	window.onload=function(){ 
		try {
			if ($buoop.ol) 
				$buoop.ol();
		}
		catch (e) {} 
		var e = document.createElement("script"); 
		e.setAttribute("type", "text/javascript"); 
		e.setAttribute("src", "//browser-update.org/update.js"); 
		document.body.appendChild(e); 
	}

	//dirty hack for dismissing modal by clicking outside it. so we dont have to fork bootbox
	$(document).on('click', '.bootbox', function(){
    var classname = event.target.className;

    if(classname && !$('.' + classname).parents('.modal-dialog').length)
        bootbox.hideAll();
	});




});

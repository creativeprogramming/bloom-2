var Home = {};

Home.resizer = function() {
    if ($(window).width() < 768 ) {
        $("body").removeClass("lg-screen").addClass("sm-screen");
    }
    else {
        $("body").removeClass("sm-screen").addClass("lg-screen");
    }
};

jQuery(document).ready(function($) {

	// Call once to set.
	Home.resizer();
	
	// Call on resize.
	$(window).on('resize', Home.resizer);
});



// raising the mobile toolbar --- http://24ways.org/2011/raising-the-bar-on-mobile ---
(function( win ){
	var doc = win.document;
	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){
		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 15 );
		win.addEventListener( "load", function(){
			setTimeout(function(){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			}, 0);
		} );
	}
})( this );

function run_scroll() {
	window.scrollTo(
		{
			top: 0,
			behavior: 'smooth'
		}
	);
}
function scroll_to_top() {
	let element = document.getElementById( 'scroll-to-top' );
	if ( ! element ) {
		return false;
	}

	element.addEventListener(
		'click',
		function() {
			run_scroll();
		}
	);

	element.addEventListener(
		'keydown',
		function ( event) {
			if ( event.key === 'Enter' ) {
				run_scroll();
			}
		}
	);

	window.addEventListener(
		'scroll',
		function() {
			let y_scroll_pos = window.pageYOffset;
			let offset       = scrollOffset.offset;

			if ( y_scroll_pos > offset ) {
				element.style.visibility = 'visible';
				element.style.opacity    = '1';
			}
			if ( y_scroll_pos <= offset ) {
				element.style.opacity    = '0';
				element.style.visibility = 'hidden';
			}
		}
	);
}

window.addEventListener(
	'load',
	function() {
		scroll_to_top();
	}
);

</div>
<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
		integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
	</script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTSt9QLWeHKFpWWPtgXrkApb6oWdWec90&libraries=places" type="text/javascript"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>
	<script src="js/simplegmaps.js" crossorigin="anonymous"></script>
	<script src="js/markerclusterer_packed.js" crossorigin="anonymous"></script>
	<script>
document.addEventListener('DOMContentLoaded', function(event) {
	var htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'/': '&#x2F;'
	};

	var htmlEscaper = /[&<>"'\/]/g;
	escapeHTML = function(string) {
		return ('' + string).replace(htmlEscaper, function(match) {
			return htmlEscapes[match];
		});
	};

	$('.highlight pre code.html').each(function() {
		var codeHtml = $(this).html();
		codeHtml = escapeHTML(codeHtml);
		$(this).html(codeHtml);
	});

	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});

});
</script>


<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" charset="utf-8"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=weather"></script>
<script src="js/jquery.simplegmaps.min.js"></script>
<script src="prism/prism.js"></script>
<script charset="utf-8">
jQuery(document).ready(function ($) {
  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"'\/]/g;
  // Escape a string for HTML interpolation.
  escapeHTML = function(string) {
    return ('' + string).replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });
  };
  // Find Prism code snippet and escape markup
  $('.language-markup').each(function() {
    var codeHtml = $(this).html();
    codeHtml = escapeHTML(codeHtml);
    $(this).html(codeHtml);
  });
});
</script>
</body>
</html>

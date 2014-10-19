<?php require('header.php') ?>
    <div class="row">
      <div class="col-xs-12">
        <div id="simplemap-1" class="google-map"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <a href="#" id="geoLocationButton" class="btn btn-primary btn-large">Geolocate me please</a>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#simplemap-1').simplegmaps();

    $('#geoLocationButton').on('click', function(event) {
      event.preventDefault();
      $('#simplemap-1').simplegmaps('setGeoLocation');
    });
  });
        </code>
      </pre>
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="code">html</h3>
        <pre>
          <code class="language-markup">
  <div id="simplemap" class="google-map"></div>
          </code>
        </pre>

      </div>
    </div>
    </div>
<script>
jQuery(document).ready(function ($) {
  $('#simplemap-1').simplegmaps();

  $('#geoLocationButton').on('click', function(event) {
    event.preventDefault();
    $('#simplemap-1').simplegmaps('setGeoLocation');
  });
});
</script>
<?php require('footer.php') ?>

<?php require('header.php') ?>
    <div class="row">
      <div class="col-xs-12">
        <div id="simplemap-1" class="google-map">
          <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <a href="#" id="toggleTraffic" class="btn btn-primary btn-large">Toggle traffic layer</a>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#simplemap-1').simplegmaps();

    $('#toggleTraffic').on('click', function(e) {
      e.preventDefault();
      $('#simplemap-1').simplegmaps('toggleTrafficLayer');
    });
  });
        </code>
      </pre>
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="code">html</h3>
        <pre>
          <code class="language-markup">
  <div id="simplemap-1" class="google-map">
    <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
  </div>
          </code>
        </pre>

      </div>
    </div>
    </div>
<script>
jQuery(document).ready(function ($) {
  $('#simplemap-1').simplegmaps();

  $('#toggleTraffic').on('click', function(e) {
    e.preventDefault();
    $('#simplemap-1').simplegmaps('toggleTrafficLayer');
  });
});
</script>
<?php require('footer.php') ?>

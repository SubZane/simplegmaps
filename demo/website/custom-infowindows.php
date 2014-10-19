<?php require('header.php') ?>
    <div class="row">
      <div class="col-xs-12">
        <div id="simplemap-1" class="google-map">
          <div class="map-marker" data-title="Remi" data-address="Bobby Van's Grill & Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA">
            <div class="map-custom-infowindow">
              <button type="button" class="close" aria-hidden="true">&times;</button>
              <img src="img/photo.png" alt="a house" class="img-responsive">
              <h2>Bobby Van's Grill</h2>
              <p>Bobby Van's Grill &amp; Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#simplemap-1').simplegmaps();
  });
        </code>
      </pre>
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="code">html</h3>
        <pre>
          <code class="language-markup">
  <div id="simplemap" class="google-map">
    <div class="map-marker" data-title="Remi" data-address="Bobby Van's Grill & Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA">
      <div class="map-custom-infowindow">
        <button type="button" class="close" aria-hidden="true">&times;</button>
        <img src="img/photo.png" alt="a house" class="img-responsive">
        <h2>Bobby Van's Grill</h2>
        <p>Bobby Van's Grill &amp; Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA</p>
      </div>
    </div>
  </div>
          </code>
        </pre>

      </div>
    </div>
    </div>
<script>
jQuery(document).ready(function ($) {
  $('#simplemap-1').simplegmaps();
});
</script>
<?php require('footer.php') ?>

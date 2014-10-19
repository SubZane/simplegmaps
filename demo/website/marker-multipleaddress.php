<?php require('header.php') ?>
    <div class="row">
      <div class="col-xs-12">
        <div id="simplemap-1" class="google-map">
          <div class="map-marker" data-title="Lorem ipsum" data-latlng="55.5897407,13.012268899999981"></div>
          <div class="map-marker" data-title="Lorem ipsum" data-address="Sofielundsvägen 8, Malmö, Sweden"></div>
          <div class="map-marker" data-title="Lorem ipsum" data-address="Stortorget 9, Malmö, Sweden"></div>
          <div class="map-marker" data-title="Lorem ipsum" data-address="Djäkneagatan 4, Malmö, Sweden"></div>
          <div class="map-marker" data-title="Lorem ipsum" data-address="Lorensborgsvägen 3, Malmö, Sweden"></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#simplemap').simplegmaps();
  });
        </code>
      </pre>
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="code">html</h3>
        <pre>
          <code class="language-markup">
  <div id="simplemap" class="google-map">
    <div class="map-marker" data-title="Lorem ipsum" data-latlng="55.5897407,13.012268899999981"></div>
    <div class="map-marker" data-title="Lorem ipsum" data-address="Sofielundsvägen 8, Malmö, Sweden"></div>
    <div class="map-marker" data-title="Lorem ipsum" data-address="Stortorget 9, Malmö, Sweden"></div>
    <div class="map-marker" data-title="Lorem ipsum" data-address="Djäkneagatan 4, Malmö, Sweden"></div>
    <div class="map-marker" data-title="Lorem ipsum" data-address="Lorensborgsvägen 3, Malmö, Sweden"></div>
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

<?php require('header.php') ?>
    <div class="row">
      <div class="col-xs-12">
        <div id="google-map-route" class="google-map">
          <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
        </div>
      </div>
    </div>
    <div class="row row-route">
      <div class="col-md-4 col-xs-12 col-sm-12 col-md-push-2">
        <div class="form-group">
           <label for="GMRoute-Fromaddress">From address</label>
           <input type="email" class="form-control" id="simplegmaps-fromaddress" placeholder="Enter address" value="New York Inn, 765 8th Ave, New York, NY 10036, USA">
         </div>
      </div>
      <div class="col-md-2 col-xs-12 col-sm-12 col-md-push-2">
        <div class="form-group">
           <label for="simplegmaps-travelmode">Travel Mode</label>
          <select class="form-control" id="simplegmaps-travelmode">
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
          </select>
        </div>
      </div>

      <div class="col-md-2 col-xs-12 col-sm-12 col-md-push-2">
        <div class="form-group">
          <button type="submit" id="simplegmaps-getroute" class="btn btn-primary">Get route</button>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-md-8 col-xs-12 col-sm-12 col-md-push-2">
        <div id="simplegmaps-directions"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#google-map-route').simplegmaps({
      getRouteButton: '#simplegmaps-getroute',
      getTravelMode: '#simplegmaps-travelmode',
      routeDirections: '#simplegmaps-directions',
      externalLink: '#simplegmaps-external',
      getFromAddress: '#simplegmaps-fromaddress',
      defaultTravelMode: 'DRIVING'
    });
  });
        </code>
      </pre>
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="code">html</h3>
        <pre>
          <code class="language-markup">
  <div id="google-map-route" class="google-map">
    <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
  </div>
          </code>
        </pre>

      </div>
    </div>
    </div>
<script>
jQuery(document).ready(function ($) {
  $('#google-map-route').simplegmaps({
    getRouteButton: '#simplegmaps-getroute',
    getTravelMode: '#simplegmaps-travelmode',
    routeDirections: '#simplegmaps-directions',
    externalLink: '#simplegmaps-external',
    getFromAddress: '#simplegmaps-fromaddress',
    defaultTravelMode: 'DRIVING'
  });

});
</script>
<?php require('footer.php') ?>

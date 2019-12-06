<?php require('includes/header.php') ?>
    <div id="simplegmaps-1" class="google-map">
      <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
    </div>
<div class="row row-route">
  <div class="col-md-4 col-xs-12 col-sm-12">
    <div class="form-group">
       <label for="GMRoute-Fromaddress">From address</label>
       <!-- New York Inn, 765 8th Ave, New York, NY 10036, USA -->
       <input type="text" class="form-control" id="simplegmaps-fromaddress" placeholder="Enter address" value="">
     </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12">
    <div class="form-group">
       <label for="simplegmaps-travelmode">Travel Mode</label>
      <select class="form-control" id="simplegmaps-travelmode"></select>
    </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12">
    <div class="form-group">
      <button type="submit" id="simplegmaps-getroute" class="btn btn-primary">Get route</button>
    </div>
  </div>
</div>


<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
	routeDescriptionContainer: '#simplegmaps-directions',
  MapOptions: {
    zoom: 14
  }
});

document.querySelector('#simplegmaps-getroute').addEventListener('click', function(event) {
  sgmaps.Directions.route({
    origin: document.querySelector('#simplegmaps-fromaddress').value,
    destination: sgmaps.Markers.get()[0].getPosition(),
    travelMode: document.querySelector('#simplegmaps-travelmode').value
  });
  event.preventDefault();
});

var travelmodes = sgmaps.Directions.TravelModes.get();
var select = document.getElementById("simplegmaps-travelmode");

for (var key in travelmodes) {
  if (travelmodes.hasOwnProperty(key)) {
    var el = document.createElement("option");
    el.textContent = key;
    el.value = travelmodes[key];
    select.appendChild(el);
  }
}
</code></pre>
</div>

<div class="highlight">
	<h3 class="code">HTML</h3>
	<pre><code class="html">

	<div class="row">
  <div class="col-xs-12">
    <div id="simplegmaps-1" class="google-map">
      <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
    </div>
  </div>
</div>
<div class="row row-route">
  <div class="col-md-4 col-xs-12 col-sm-12">
    <div class="form-group">
       <label for="GMRoute-Fromaddress">From address</label>
       <!-- New York Inn, 765 8th Ave, New York, NY 10036, USA -->
       <input type="text" class="form-control" id="simplegmaps-fromaddress" placeholder="Enter address" value="">
     </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12">
    <div class="form-group">
       <label for="simplegmaps-travelmode">Travel Mode</label>
      <select class="form-control" id="simplegmaps-travelmode"></select>
    </div>
  </div>
  <div class="col-md-2 col-xs-12 col-sm-12">
    <div class="form-group">
      <button type="submit" id="simplegmaps-getroute" class="btn btn-primary">Get route</button>
    </div>
  </div>
</div>

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
	routeDescriptionContainer: '#simplegmaps-directions',
  MapOptions: {
    zoom: 14
  }
});

document.querySelector('#simplegmaps-getroute').addEventListener('click', function(event) {
  sgmaps.Directions.route({
    origin: document.querySelector('#simplegmaps-fromaddress').value,
    destination: sgmaps.Markers.get()[0].getPosition(),
    travelMode: document.querySelector('#simplegmaps-travelmode').value
  });
  event.preventDefault();
});

var travelmodes = sgmaps.Directions.TravelModes.get();
var select = document.getElementById("simplegmaps-travelmode");

for (var key in travelmodes) {
  if (travelmodes.hasOwnProperty(key)) {
    var el = document.createElement("option");
    el.textContent = key;
    el.value = travelmodes[key];
    select.appendChild(el);
  }
}

</script>

<?php require('includes/footer.php') ?>

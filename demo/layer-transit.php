<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>
<a href="#" id="toggleTransit" class="btn btn-primary btn-large">Toggle Transit layer</a>


<div class="highlight">
	<h3 class="code">javascript</h3>
	<pre><code class="javascript">
	var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  MapOptions: {
    zoom: 16
  }
});
document.querySelector('#toggleTransit').addEventListener('click', function(event) {
  sgmaps.TransitLayer.toggle();
  event.preventDefault();
});
</code></pre>
</div>

<div class="highlight">
	<h3 class="code">HTML</h3>
	<pre><code class="html">

	<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>
<a href="#" id="toggleTransit" class="btn btn-primary btn-large">Toggle Transit layer</a>

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1',
  MapOptions: {
    zoom: 16
  }
});
document.querySelector('#toggleTransit').addEventListener('click', function(event) {
  sgmaps.TransitLayer.toggle();
  event.preventDefault();
});

</script>

<?php require('includes/footer.php') ?>

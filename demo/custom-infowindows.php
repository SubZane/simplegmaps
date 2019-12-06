<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
	<div class="map-marker" data-title="Bobby Van's Grill" data-address="Bobby Van's Grill & Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA">
		<div class="map-custom-infowindow">
			<button type="button" class="close" aria-hidden="true">&times;</button>
			<img src="img/photo.png" alt="a house" class="img-responsive">
			<h2>Bobby Van's Grill</h2>
			<p>Bobby Van's Grill &amp; Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA</p>
		</div>
	</div>
	<div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States">
		<div class="map-custom-infowindow">
			<button type="button" class="close" aria-hidden="true">&times;</button>
			<img src="img/photo.png" alt="a house" class="img-responsive">
			<h2>Remi</h2>
			<p>Remi 145 W 53rd St, New York, NY, United States</p>
		</div>
	</div>
</div>


		<div class="highlight">
		<h3 class="code">javascript</h3>
		<pre><code class="javascript">
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1'
});
</code></pre>
</div>

<div class="highlight">
<h3 class="code">HTML</h3>
		<pre><code class="html">

<div id="simplegmaps-1" class="google-map">
	<div class="map-marker" data-title="Bobby Van's Grill" data-address="Bobby Van's Grill & Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA">
		<div class="map-custom-infowindow">
			<button type="button" class="close" aria-hidden="true">&times;</button>
			<img src="img/photo.png" alt="a house" class="img-responsive">
			<h2>Bobby Van's Grill</h2>
			<p>Bobby Van's Grill &amp; Steakhouse - 50th Street, 135 W 50th St, New York, NY 10020, USA</p>
		</div>
	</div>
	<div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States">
		<div class="map-custom-infowindow">
			<button type="button" class="close" aria-hidden="true">&times;</button>
			<img src="img/photo.png" alt="a house" class="img-responsive">
			<h2>Remi</h2>
			<p>Remi 145 W 53rd St, New York, NY, United States</p>
		</div>
	</div>
</div>

		</code></pre>
</div>

<div class="highlight">
<h3 class="code">CSS</h3>
		<pre><code class="css">
.map-custom-infowindow {
  position: absolute;
  background-color: #fff;
  display: block;
  bottom: 30px;
  left: 0;
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  min-height: 120px;
  border: 1px solid #bcb8ac;
  color: #fff;
  color: #333;
  z-index: 10;
  padding: 10px;
  border-radius: 10px;
}

.map-custom-infowindow h2 {
  margin: 0;
  padding: 0;
}

.map-custom-infowindow .close {
  margin-top: -5px;
}

.map-custom-infowindow img {
  width: 200px;
  float: left;
  margin-right: 20px;
}
		</code></pre>
</div>



<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplegmaps-1'
});
</script>

<?php require('includes/footer.php') ?>

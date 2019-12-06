<?php require('includes/header.php') ?>
<div id="simplemaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States">
    <div class="map-infowindow">
      <h2>Remi</h2>
      <p>Remi 145 W 53rd St, New York, NY, United States</p>
    </div>
  </div>
  <div class="map-marker" data-title="Remi" data-address="145 W 52rd St, New York, NY, United States">
    <div class="map-infowindow">
      <h2>Oter place</h2>
      <p>145 W 52rd St, New York, NY, United States</p>
    </div>
  </div>
</div>


		<div class="highlight">
		<h3 class="code">javascript</h3>
		<pre><code class="javascript">
var sgmaps = new simplegmaps();
sgmaps.init({
	container: '#simplemaps-1',
	multipleInfoWindows: false
});
</code></pre>
</div>

<div class="highlight">
<h3 class="code">HTML</h3>
		<pre><code class="html">

<div id="simplemaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States">
    <div class="map-infowindow">
      <h2>Remi</h2>
      <p>Remi 145 W 53rd St, New York, NY, United States</p>
    </div>
  </div>
  <div class="map-marker" data-title="Remi" data-address="145 W 52rd St, New York, NY, United States">
    <div class="map-infowindow">
      <h2>Oter place</h2>
      <p>145 W 52rd St, New York, NY, United States</p>
    </div>
  </div>
</div>

		</code></pre>
</div>

<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
  container: '#simplemaps-1',
  multipleInfoWindows: false
});
</script>

<?php require('includes/footer.php') ?>

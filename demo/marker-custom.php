<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map">
  <div class="map-marker" data-title="Remi" data-icon="img/custommarker.png" data-icon2x="img/custommarker@2x.png"  data-latlng="55.5897407,12.012268899999981"></div>
  <div class="map-marker" data-title="Remi" data-icon="img/custommarker.png" data-icon2x="img/custommarker@2x.png"  data-latlng="55.5897407,13.012268899999981"></div>
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
  <div class="map-marker" data-title="Remi" data-icon="img/custommarker.png" data-icon2x="img/custommarker@2x.png"  data-latlng="55.5897407,12.012268899999981"></div>
  <div class="map-marker" data-title="Remi" data-icon="img/custommarker.png" data-icon2x="img/custommarker@2x.png"  data-latlng="55.5897407,13.012268899999981"></div>
</div>

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

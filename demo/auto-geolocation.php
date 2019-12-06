<?php require('includes/header.php') ?>
<div id="simplegmaps-1" class="google-map"></div>

		<div class="highlight">
		<h3 class="code">javascript</h3>
		<pre><code class="javascript">
var sgmaps = new simplegmaps();
sgmaps.init({
	container: '#simplegmaps-1',
	GeoLocation: true,
	MapOptions: {
		zoom: 14
	}
});
</code></pre>
</div>

<div class="highlight">
<h3 class="code">HTML</h3>
		<pre><code class="html">
<div id="simplegmaps-1" class="google-map"></div>
		</code></pre>
</div>



<?php require('includes/scripts.php') ?>

<script>
var sgmaps = new simplegmaps();
sgmaps.init({
	container: '#simplegmaps-1',
	GeoLocation: true,
	MapOptions: {
		zoom: 14
	}
});
</script>

<?php require('includes/footer.php') ?>
